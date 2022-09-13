import _, { isEmpty, trim } from "lodash";
import Aigle from "aigle";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";
import { SourceGroupDto } from "../dtos/source-group.dto";
import { SourcePersonDto } from "../dtos/source-person.dto";
import { SourceSystemDto } from "../dtos/source-system.dto";
import { SourceContainerDto } from "../dtos/source-container.dto";
import { EntityRepository } from "../dao/entity.repository";
import { GroupRepository } from "../dao/group.repository";
import { RelationshipRepository } from "../dao/relationship.repository";
import { getScopes } from "../get-scopes";

const relationships: (() => Promise<void>)[] = [];

const ingestDep = async (dep: string, this_: string, lineage: string[]) => {
  const [relation, desc, tech] = dep.split(":");

  let sender;
  let receiver;

  if (relation.includes("->")) {
    [sender, receiver] = relation.split("->");
  } else if (relation.includes("<-")) {
    [receiver, sender] = relation.split("<-");
  } else {
    throw new Error(
      `Failed to process Relation, unrecognised Relationship expected either -> or <-, received ${relation}`
    );
  }

  sender = trim(sender);
  receiver = trim(receiver);

  const sender_ = sender;
  const receiver_ = receiver;

  relationships.push(async () => {
    try {
      const scope = lineage.join(".");

      // Evaluate Fully Qualified Name if not already one
      if (!sender.includes(".")) {
        const scopes = getScopes(scope);
        const results = await Aigle.map(scopes, (s) => EntityRepository.findByAddress(`${s}.${sender}`));
        sender = _(results).compact().first()?.address;
      }

      // Evaluate Fully Qualified Name if not already one
      if (!receiver.includes(".")) {
        const scopes = getScopes(scope);
        const results = await Aigle.map(scopes, (s) => EntityRepository.findByAddress(`${s}.${receiver}`));
        receiver = _(results).compact().first()?.address;
      }

      await RelationshipRepository.save({
        sender,
        receiver,
        desc: desc && trim(desc),
        tech: tech && trim(tech),
        deprecated: false,
      });
    } catch (error) {
      if (error.message.startsWith("SQLITE_CONSTRAINT:")) {
        const offender = error.message.includes("sender") ? sender_ : receiver_;
        throw new Error(
          `Failed to process relationship on '${this_}', referenced entity '${offender}' not found in scope, try qualifying the name with 'group.system.container' as necessary \n\t${dep}`
        );
      }
      throw new Error(`Failed to ingest relationship for '${this_}' due to ${error.message}\n\t${dep}`);
    }
  });
};

const ingestDeps = (deps: string, this_: string, lineage: string[]) => {
  return deps
    .replace(/this/g, this_)
    .split("\n")
    .filter((it) => !isEmpty(it))
    .forEach((dep) => ingestDep(dep, this_, lineage));
};

const ingestContainer = async (
  { id, name, desc, notes, external, deprecated, tags, tech, deps }: SourceContainerDto,
  lineage: string[]
) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    notes,
    tech,
    external: Boolean(external),
    deprecated: Boolean(deprecated),
    type: "container",
    tags: tags?.join(","),
  });
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestSystem = async (
  { id, name, desc, notes, external, deprecated, tags, deps, containers }: SourceSystemDto,
  lineage: string[]
) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    external: Boolean(external),
    deprecated: Boolean(deprecated),
    type: "system",
    tags: tags?.join(","),
    notes,
  });

  if (containers)
    await Aigle.forEach(containers, (container) => ingestContainer(<SourceContainerDto>container, [...lineage, id]));
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestPerson = async (
  { id, name, desc, notes, external, deprecated, tags, deps }: SourcePersonDto,
  lineage: string[]
) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    notes,
    external: Boolean(external),
    deprecated: Boolean(deprecated),
    type: "person",
    tags: tags?.join(","),
  });
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestGroup = async ({ id, name, people, systems, tags }: SourceGroupDto) => {
  await GroupRepository.save({ id, name, tags: tags?.join(",") });

  if (people) await Aigle.forEach(people, (person) => ingestPerson(<SourcePersonDto>person, [id]));
  if (systems) await Aigle.forEach(systems, (system) => ingestSystem(system, [id]));
};

export const SourceIngestionService = {
  ingestWorkspace: async (workspace: SourceWorkspaceDto) => {
    if (workspace.groups) await Aigle.forEach(workspace.groups, (group) => ingestGroup(<SourceGroupDto>group));
    await Aigle.forEach(relationships, (relationship) => relationship());
  },
};
