import { Describable, Identifiable, RelationshipDto, Taggable, WorkspaceDto } from "@c4mjs/workspace";
import { filter, find, keyBy } from "lodash";
import { Entity } from "./entity";
import { Relationship } from "./relationship";
import { Scope } from "./scope";

export class Workspace {
  readonly id: string;

  readonly name: string;

  readonly version: string;

  private groups: (Identifiable & Describable & Taggable)[];

  private entities: Entity[];

  private relationships: Relationship[];

  constructor({ id, name, version, groups }: WorkspaceDto) {
    this.id = id;

    this.name = name;

    this.version = version;

    this.groups = groups;

    this.entities = groups.flatMap((g) => [
      ...g.people.map((p) => new Entity({ ...p, type: "person", groupId: g.id })),
      ...g.systems.map((s) => new Entity({ ...s, type: "system", groupId: g.id })),
      ...g.systems.flatMap((s) =>
        s.containers.map((c) => new Entity({ ...c, type: "container", groupId: g.id, systemId: s.id }))
      ),
    ]);

    const entitiesLookup = keyBy(this.entities, "id");
    const mapRelationship = (r: RelationshipDto) =>
      new Relationship(entitiesLookup[r.sender], entitiesLookup[r.receiver], r.desc, r.tech);

    this.relationships = groups.flatMap((g) => [
      ...g.people.flatMap((p) => p.relationships.map(mapRelationship)),
      ...g.systems.flatMap((s) => [
        ...s.relationships.map(mapRelationship),
        ...s.containers.flatMap((c) => c.relationships.map(mapRelationship)),
      ]),
    ]);
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
    return [
      ...this.getContextRelationshipsWithGroup(groupId),
      ...this.getContainerRelationshipsWithGroup(groupId),
    ].filter(({ sender, receiver }) => sender.systemId === systemId || receiver.systemId === systemId);
  }
}
