import { XmlObject } from "xml";
import { Entity } from "./Entity";
import { addLazySetup } from "./LazySetup";
import { Component } from "./Component";

export class Container extends Entity {
  tech?: string;

  protected readonly components: Component[];

  constructor(name: string) {
    super(name);
    this.components = [];
  }

  component(name: string, setup?: (component: Component) => void): Component {
    const component = new Component(name);
    setup && addLazySetup(() => setup(component));
    this.components.push(component);
    return component;
  }

  toXmlObject(): XmlObject {
    const _attr: any = { id: this.id, name: this.name };
    if (this.external) _attr.external = this.external;
    if (this.desc) _attr.desc = this.desc;
    if (this.tech) _attr.tech = this.tech;
    return {
      [Container.name]: [
        { _attr },
        ...this.relationships.map((it) => it.toXmlObject()),
        ...this.components.map((it) => it.toXmlObject()),
      ],
    };
  }
}
