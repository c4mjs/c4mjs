import { XmlObject } from "xml";
import { Entity } from "./Entity";
import { Container } from "./Container";
import { addLazySetup } from "./LazySetup";

export class System extends Entity {
  protected readonly containers: Container[];

  constructor(name: string) {
    super(name);
    this.containers = [];
  }

  container(name: string, setup?: (container: Container) => void): Container {
    const container = new Container(name);
    setup && addLazySetup(() => setup(container));
    this.containers.push(container);
    return container;
  }

  toXmlObject(): XmlObject {
    const _attr: any = { id: this.id, name: this.name };
    if (this.external) _attr.external = this.external;
    if (this.desc) _attr.desc = this.desc;
    return {
      [System.name]: [
        { _attr },
        ...this.relationships.map((it) => it.toXmlObject()),
        ...this.containers.map((it) => it.toXmlObject()),
      ],
    };
  }
}
