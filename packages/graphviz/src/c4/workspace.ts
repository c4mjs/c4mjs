import { GroupDto, WorkspaceDto } from "@c4mjs/workspace";
import _, { filter, find } from "lodash";
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
      (it) =>
        new Relationship(
          this.getEntity(it.sender),
          this.getEntity(it.receiver),
          it.desc,
          it.notes,
          it.tech,
          [],
          it.deprecated
        )
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

  getContextRelationships(): Relationship[] {
    return (
      _(this.relationships)
        .map((r) => {
          let sender = r.sender;
          let receiver = r.receiver;
          if (r.sender.scope === Scope.CONTAINER) sender = this.getEntity(sender.parentAddress);
          if (r.receiver.scope === Scope.CONTAINER) receiver = this.getEntity(receiver.parentAddress);
          return new Relationship(sender, receiver, r.desc, r.notes, r.tech, r.tags, r.deprecated);
        })
        // Remove Inter System Messages
        .filter(({ sender, receiver }) => sender.address !== receiver.address)
        .filter({ scope: Scope.CONTEXT })
        .uniqBy((it) => it.hash)
        .value()
    );
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
    return [
      ...this.getContextRelationshipsWithGroup(groupId).filter(
        ({ sender, receiver }) => sender.systemId === systemId || receiver.systemId === systemId
      ),
      ...this.getContainerRelationshipsWithGroup(groupId).filter(
        ({ sender, receiver }) => sender.systemId === systemId || receiver.systemId === systemId
      ),
    ];
  }
}
