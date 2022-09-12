import { GroupDto, WorkspaceDto } from "@c4mjs/workspace";
import { filter, find } from "lodash";
import { Entity } from "./entity";
import { Relationship } from "./relationship";
import { Scope } from "./scope";

export class Workspace {
  readonly id: string;

  readonly name: string;

  readonly version: string;

  private groups: GroupDto[];

  private entities: Entity[];

  private relationships: Relationship[];

  constructor({ id, name, version, groups, entities, relationships }: WorkspaceDto) {
    this.id = id;

    this.name = name;

    this.version = version;

    this.groups = groups;

    this.entities = entities.map((it) => new Entity(it));

    this.relationships = relationships.map(
      (it) => new Relationship(this.getEntity(it.sender), this.getEntity(it.receiver), it.desc, it.tech)
    );
  }

  getEntity(address: string): Entity {
    const entity = find(this.entities, { address });
    if (!entity) throw new Error(`Unable to find entity with address ${entity} in workspace`);
    return entity as Entity;
  }

  getGroups() {
    return this.groups;
  }

  getGroup(groupId?: string) {
    const g = find(this.groups, { id: groupId });
    if (!g) throw new Error(`Unable to find group with id ${groupId} in workspace`);
    return g;
  }

  getSystem(systemId: string) {
    const system = find(this.entities, { id: systemId });
    if (!system) throw new Error(`Unable to find system with id ${system} in workspace`);
    return system;
  }

  /**
   * Returns Entities that participate in Context Graphs
   */
  getContextEntities() {
    return filter(this.entities, { scope: Scope.CONTEXT });
  }

  getContextRelationships() {
    return filter(this.relationships, { scope: Scope.CONTEXT });
  }

  getContainerRelationships() {
    return filter(this.relationships, { scope: Scope.CONTAINER });
  }

  getContextRelationshipsWithGroup(groupId: string) {
    return this.getContextRelationships().filter(
      ({ sender, receiver }) => sender.groupId === groupId || receiver.groupId === groupId
    );
  }

  getContainerRelationshipsWithGroup(groupId: string) {
    return this.getContainerRelationships().filter(
      ({ sender, receiver }) => sender.groupId === groupId || receiver.groupId === groupId
    );
  }

  getContainerRelationshipsWithSystem(groupId: string, systemId: string) {
    return [...this.getContextRelationshipsWithGroup(groupId), ...this.getContainerRelationshipsWithGroup(groupId)];
  }
}
