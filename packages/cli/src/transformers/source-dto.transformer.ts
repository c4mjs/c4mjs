import { isEmpty, omit, trim } from "lodash";
import {
  ComponentDto,
  ContainerDto,
  GroupDto,
  PersonDto,
  RelationshipDto,
  SystemDto,
  WorkspaceDto,
} from "@c4mjs/workspace";
import { SourceComponentDto } from "../dtos/source-component.dto";
import { SourceContainerDto } from "../dtos/source-container.dto";
import { SourceSystemDto } from "../dtos/source-system.dto";
import { SourcePersonDto } from "../dtos/source-person.dto";
import { SourceGroupDto } from "../dtos/source-group.dto";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";

const transformRelationship = (dep: string): RelationshipDto => {
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

const transformRelationships = (deps: string, id: string): RelationshipDto[] => {
  return deps
    .replace(/this/g, id)
    .split("\n")
    .filter((it) => !isEmpty(it))
    .map((it) => transformRelationship(it));
};

const transformComponent = (source: SourceComponentDto): ComponentDto => ({
  ...omit(source, "deps"),
  relationships: source.deps ? transformRelationships(source.deps, source.id) : [],
});

const transformContainer = (source: SourceContainerDto): ContainerDto => ({
  ...omit(source, ["deps", "components"]),
  components: source.components?.map(transformComponent) || [],
  relationships: source.deps ? transformRelationships(source.deps, source.id) : [],
});

const transformSystem = (source: SourceSystemDto): SystemDto => ({
  ...omit(source, ["deps", "containers"]),
  containers: source.containers?.map(transformContainer) || [],
  relationships: source.deps ? transformRelationships(source.deps, source.id) : [],
});

const transformPerson = (source: SourcePersonDto): PersonDto => ({
  ...omit(source, ["deps"]),
  relationships: source.deps ? transformRelationships(source.deps, source.id) : [],
});

const transformGroup = (source: SourceGroupDto): GroupDto => ({
  ...omit(source, ["people", "systems"]),
  people: source.people?.map(transformPerson) || [],
  systems: source.systems?.map(transformSystem) || [],
});

const transformWorkspace = (source: SourceWorkspaceDto): WorkspaceDto => ({
  ...omit(source, ["groups"]),
  groups: source.groups?.map(transformGroup) || [],
});

export const SourceDtoTransformer = {
  transformWorkspace,
  transformGroup,
  transformPerson,
  transformSystem,
  transformContainer,
  transformComponent,
  transformRelationships,
  transformRelationship,
};
