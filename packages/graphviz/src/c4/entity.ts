import { body, node, Renderable, subtitle, title } from "../dot";
import { config } from "../config";

export class Entity implements Renderable {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: "person" | "system",
    public readonly groupId: string,
    public readonly desc?: string,
    public readonly external?: boolean
  ) {}

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
          fillcolor: this.external ? config.person.fillcolor_ext : config.person.fillcolor,
          color: this.external ? config.person.color_ext : config.person.color,
          fontcolor: config.person.fontcolor,
        });
    }
  }
}
