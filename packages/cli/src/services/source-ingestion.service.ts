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

      await RelationshipRepository.save({ sender, receiver, desc: desc && trim(desc), tech: tech && trim(tech) });
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
  { id, name, desc, external, tags, tech, deps }: SourceContainerDto,
  lineage: string[]
) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    tech,
    external: Boolean(external),
    type: "container",
    tags: tags?.join(","),
  });
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestSystem = async (
  { id, name, desc, external, tags, deps, containers }: SourceSystemDto,
  lineage: string[]
) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    external: Boolean(external),
    type: "system",
    tags: tags?.join(","),
  });

  if (containers) await Aigle.forEach(containers, (container) => ingestContainer(container, [...lineage, id]));
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestPerson = async ({ id, name, desc, external, tags, deps }: SourcePersonDto, lineage: string[]) => {
  await EntityRepository.save({
    id,
    address: [...lineage, id].join("."),
    name,
    desc,
    external: Boolean(external),
    type: "person",
    tags: tags?.join(","),
  });
  if (deps) ingestDeps(deps, id, lineage);
};

const ingestGroup = async ({ id, name, desc, people, systems, tags }: SourceGroupDto) => {
  await GroupRepository.save({ id, name, desc, tags: tags?.join(",") });

  if (people) await Aigle.forEach(people, (person) => ingestPerson(person, [id]));
  if (systems) await Aigle.forEach(systems, (system) => ingestSystem(system, [id]));
};

export const SourceIngestionService = {
  ingestWorkspace: async (workspace: SourceWorkspaceDto) => {
    if (workspace.groups) await Aigle.forEach(workspace.groups, (group) => ingestGroup(group));
    await Aigle.forEach(relationships, (relationship) => relationship());
  },
};
