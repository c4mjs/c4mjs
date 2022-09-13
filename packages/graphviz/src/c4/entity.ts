import { compact, split } from "lodash";
import { EntityDto } from "@c4mjs/workspace";
import { body, node, Renderable, subtitle, title } from "../dot";
import { config } from "../config";
import { Scope } from "./scope";

export class Entity implements Renderable {
  public readonly id: string;
  public readonly address: string;
  public readonly name: string;
  public readonly type: EntityDto["type"];
  public readonly desc?: string;
  public readonly notes?: string;
  public readonly tech?: string;
  public readonly tags: string[];
  public readonly external?: boolean;
  public readonly deprecated?: boolean;

  constructor(private readonly properties: EntityDto) {
    this.id = properties.id;
    this.address = properties.address;
    this.name = properties.name;
    this.notes = properties.notes;
    this.type = properties.type;
    this.desc = properties.desc;
    this.tech = properties.tech;
    this.tags = properties.tags || [];
    this.external = properties.external;
    this.deprecated = properties.deprecated;
  }

  get dotAddress() {
    return this.address.replace(/\./g, "__");
  }

  get parentAddress() {
    return split(this.address, ".").slice(0, -1).join(".");
  }

  get groupId() {
    return split(this.address, ".")[0];
  }

  get systemId() {
    return split(this.address, ".")[1];
  }

  get containerId() {
    return split(this.address, ".")[2];
  }

  get scope(): Scope {
    if (this.type === "container") return Scope.CONTAINER;

    return Scope.CONTEXT;
  }

  get shape() {
    if (this.tags?.includes("database")) return "cylinder";

    return "rectangle";
  }

  get dot() {
    switch (this.type) {
      case "system":
        return node({
          id: this.dotAddress,
          label: [
            title(this.name),
            subtitle("[Software System]"),
            this.desc ? body(this.desc) : undefined,
            this.deprecated ? "[DEPRECATED]" : undefined,
          ].join("<br />"),
          tooltip: this.notes || this.desc || this.name,
          shape: this.shape,
          style: ["filled"],
          fillcolor: this.external ? config.softwareSystem.fillcolor_ext : config.softwareSystem.fillcolor,
          color: this.external ? config.softwareSystem.color_ext : config.softwareSystem.color,
          fontcolor: config.softwareSystem.fontcolor,
          classNames: compact([
            ...this.tags,
            this.deprecated ? "deprecated" : undefined,
            this.external ? "external" : undefined,
          ]),
        });
      case "person":
        return node({
          id: this.dotAddress,
          label: [
            title(this.name),
            subtitle("[Person]"),
            this.desc ? body(this.desc) : undefined,
            this.deprecated ? "[DEPRECATED]" : undefined,
          ].join("<br />"),
          tooltip: this.notes || this.desc || this.name,
          shape: this.shape,
          style: ["filled", "rounded"],
          fillcolor: this.properties.external ? config.person.fillcolor_ext : config.person.fillcolor,
          color: this.properties.external ? config.person.color_ext : config.person.color,
          fontcolor: config.person.fontcolor,
          classNames: compact([
            ...this.tags,
            this.deprecated ? "deprecated" : undefined,
            this.external ? "external" : undefined,
          ]),
        });
      case "container":
        return node({
          id: this.dotAddress,
          label: [
            title(this.name),
            subtitle(this.tech ? `[Container]: ${this.tech}` : "[Container]"),
            this.deprecated ? "<b>[DEPRECATED]</b>" : undefined,
            this.desc ? body(this.desc) : undefined,
          ].join("<br />"),
          tooltip: this.notes || this.desc || this.name,
          shape: this.shape,
          style: ["filled"],
          fillcolor: this.properties.external ? config.container.fillcolor_ext : config.container.fillcolor,
          color: this.properties.external ? config.container.color_ext : config.container.color,
          fontcolor: config.container.fontcolor,
          classNames: compact([
            ...this.tags,
            this.deprecated ? "deprecated" : undefined,
            this.external ? "external" : undefined,
          ]),
        });
    }

    return ``;
  }
}
