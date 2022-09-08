import { body, node, Renderable, subtitle, title } from "../dot";
import { config } from "../config";
import { Scope } from "./scope";

export type EntityProperties = {
  id: string;
  name: string;
  type: "person" | "system" | "container";
  groupId: string;
  systemId?: string;
  desc?: string;
  tech?: string;
  external?: boolean;
};

export class Entity implements Renderable {
  public readonly id: string;
  public readonly name: string;
  public readonly type: EntityProperties["type"];
  public readonly groupId: string;
  public readonly systemId?: string;
  public readonly desc?: string;
  public readonly tech?: string;
  public readonly external?: boolean;

  constructor(private readonly properties: EntityProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.type = properties.type;
    this.groupId = properties.groupId;
    this.systemId = properties.systemId;
    this.desc = properties.desc;
    this.tech = properties.tech;
    this.external = properties.external;
  }

  get scope(): Scope {
    if (this.type === "container") return Scope.CONTAINER;

    return Scope.CONTEXT;
  }

  get dot() {
    switch (this.type) {
      case "system":
        return node({
          id: this.id,
          label: [title(this.name), subtitle("[Software System]"), this.desc ? body(this.desc) : undefined].join(
            "<br />"
          ),
          shape: "rect",
          style: ["filled"],
          fillcolor: this.external ? config.softwareSystem.fillcolor_ext : config.softwareSystem.fillcolor,
          color: this.external ? config.softwareSystem.color_ext : config.softwareSystem.color,
          fontcolor: config.softwareSystem.fontcolor,
        });
      case "person":
        return node({
          id: this.id,
          label: [title(this.name), subtitle("[Person]"), this.desc ? body(this.desc) : undefined].join("<br />"),
          shape: "rect",
          style: ["filled"],
          fillcolor: this.properties.external ? config.person.fillcolor_ext : config.person.fillcolor,
          color: this.properties.external ? config.person.color_ext : config.person.color,
          fontcolor: config.person.fontcolor,
        });
      case "container":
        return node({
          id: this.id,
          label: [
            title(this.name),
            subtitle(this.tech ? `[Container]: ${this.tech}` : "[Container]"),
            this.desc ? body(this.desc) : undefined,
          ].join("<br />"),
          shape: "rect",
          style: ["filled"],
          fillcolor: this.properties.external ? config.container.fillcolor_ext : config.container.fillcolor,
          color: this.properties.external ? config.container.color_ext : config.container.color,
          fontcolor: config.container.fontcolor,
        });
    }

    return ``;
  }
}
