import { exit } from "node:process";
import RefParser from "@apidevtools/json-schema-ref-parser";
import { Command } from "commander";
import Ajv from "ajv";
import { isEmpty, omit, trim } from "lodash";
import { debug } from "../debug";
import workspaceSchema from "../workspace.schema.json";
import sourceWorkspaceSchema from "../source-workspace.schema.json";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";
import { WorkspaceDto } from "../dtos/workspace.dto";
import { SourceComponentDto } from "../dtos/source-component.dto";
import { ComponentDto } from "../dtos/component.dto";
import { SourceContainerDto } from "../dtos/source-container.dto";
import { ContainerDto } from "../dtos/container.dto";
import { SourceSystemDto } from "../dtos/source-system.dto";
import { SystemDto } from "../dtos/system.dto";
import { SourcePersonDto } from "../dtos/source-person.dto";
import { PersonDto } from "../dtos/person.dto";
import { SourceGroupDto } from "../dtos/source-group.dto";
import { GroupDto } from "../dtos/group.dto";
import { RelationshipDto } from "../dtos/relationship.dto";

const ajv = new Ajv({ allErrors: true, validateFormats: true });

const validateSourceWorkspace = ajv.compile(sourceWorkspaceSchema);
const validateWorkspace = ajv.compile(workspaceSchema);

const toRelationship = (dep: string): RelationshipDto => {
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

  return { sender: trim(sender), receiver: trim(receiver), desc: trim(desc), tech: tech && trim(tech) };
};

const toRelationships = (deps: string, id: string): RelationshipDto[] => {
  return deps
    .replace(/this/g, id)
    .split("\n")
    .filter((it) => !isEmpty(it))
    .map(toRelationship);
};

const toComponent = (source: SourceComponentDto): ComponentDto => ({
  ...omit(source, "deps"),
  relationships: source.deps ? toRelationships(source.deps, source.id) : [],
});

const toContainer = (source: SourceContainerDto): ContainerDto => ({
  ...omit(source, ["deps", "components"]),
  components: source.components?.map(toComponent) || [],
  relationships: source.deps ? toRelationships(source.deps, source.id) : [],
});

const toSystem = (source: SourceSystemDto): SystemDto => ({
  ...omit(source, ["deps", "containers"]),
  containers: source.containers?.map(toContainer) || [],
  relationships: source.deps ? toRelationships(source.deps, source.id) : [],
});

const toPerson = (source: SourcePersonDto): PersonDto => ({
  ...omit(source, ["deps"]),
  relationships: source.deps ? toRelationships(source.deps, source.id) : [],
});

const toGroup = (source: SourceGroupDto): GroupDto => ({
  ...omit(source, ["people", "systems"]),
  people: source.people?.map(toPerson) || [],
  systems: source.systems?.map(toSystem) || [],
});

const toWorkspace = (source: SourceWorkspaceDto): WorkspaceDto => ({
  ...omit(source, ["groups"]),
  groups: source.groups?.map(toGroup) || [],
});

export const build = new Command()
  .name("build")
  .description("builds the c4mjs workspace file")
  .requiredOption("-i, --input <char>", "Path to the workspace entry file")
  .action(async ({ input }) => {
    debug("Generating workspace xml with args %o", { input });
    debug("Current working directory %s", process.cwd());

    debug("Reading Workspace Files");
    const sourceWorkspace: SourceWorkspaceDto = (await RefParser.dereference(input)) as SourceWorkspaceDto;

    debug("Validating Workspace");
    if (!validateSourceWorkspace(sourceWorkspace)) {
      debug("Validation Failed for Source Workspace");
      console.error("Validation of Workspace Source Files Failed!");
      console.error(validateSourceWorkspace.errors);
      exit(1);
    }

    const workspace: WorkspaceDto = toWorkspace(sourceWorkspace);

    if (!validateWorkspace(workspace)) {
      debug("Validation Failed for Transformed Workspace");
      console.error("Validation of Transformed Source Files Failed!");
      console.error(validateWorkspace.errors);
      // eslint-disable-next-line unicorn/no-process-exit
      exit(1);
    }

    console.log(JSON.stringify(workspace, undefined, 2));
  });
