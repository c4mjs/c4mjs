import { XmlObject } from "xml";
import { Entity } from "./Entity";

export class Person extends Entity {
  constructor(name: string) {
    super(name);
  }

  toXmlObject(): XmlObject {
    const _attr: any = { id: this.id, name: this.name };
    if (this.external) _attr.external = this.external;
    if (this.desc) _attr.desc = this.desc;
    return {
      [Person.name]: [{ _attr }, ...this.relationships.map((it) => it.toXmlObject())],
    };
  }
}
