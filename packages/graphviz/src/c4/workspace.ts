import { Describable, Identifiable, Taggable, WorkspaceDto } from "@c4mjs/workspace";
import { find, keyBy } from "lodash";
import { Entity } from "./entity";
import { Relationship } from "./relationship";

export class Workspace {
  readonly id: string;

  readonly name: string;

  readonly version: string;

  public groups: (Identifiable & Describable & Taggable)[];

  public entities: Entity[];

  public relationships: Relationship[];

  constructor({ id, name, version, groups }: WorkspaceDto) {
    this.id = id;

    this.name = name;

    this.version = version;

    this.groups = groups;

    this.entities = groups.flatMap((g) => [
      ...g.people.map((p) => new Entity(p.id, p.name, "person", g.id, p.desc, p.external)),
      ...g.systems.map((s) => new Entity(s.id, s.name, "system", g.id, s.desc, s.external)),
    ]);

    const entitiesLookup = keyBy(this.entities, "id");
    this.relationships = groups.flatMap((g) => [
      ...g.people.flatMap((p) =>
        p.relationships.map(
          (r) => new Relationship(entitiesLookup[r.sender], entitiesLookup[r.receiver], r.desc, r.tech)
        )
      ),
      ...g.systems.flatMap((p) =>
        p.relationships.map(
          (r) => new Relationship(entitiesLookup[r.sender], entitiesLookup[r.receiver], r.desc, r.tech)
        )
      ),
    ]);
  }

  getGroup(groupId?: string) {
    const g = find(this.groups, { id: groupId });
    if (!g) throw new Error(`Unable to find group with id ${groupId} in workspace`);
    return g;
  }
}
