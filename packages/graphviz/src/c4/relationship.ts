import hash from "object-hash";
import { config } from "../config";
import { arrow, body, Renderable } from "../dot";
import { Entity } from "./entity";
import { Scope } from "./scope";
import { compact } from "lodash";
let ID_SEQ = 100_000;

export class Relationship implements Renderable {
  readonly id: string;

  constructor(
    public sender: Entity,
    public receiver: Entity,
    public readonly desc?: string,
    public readonly notes?: string,
    public readonly tech?: string,
    public readonly tags?: string[],
    public readonly deprecated?: boolean
  ) {
    this.id = `${ID_SEQ++}`;
  }

  get scope(): Scope {
    if (this.sender.type === "container" || this.receiver.type === "container") return Scope.CONTAINER;

    return Scope.CONTEXT;
  }

  get hash() {
    return hash({ sender: this.sender.address, receiver: this.receiver.address, desc: this.desc, tech: this.tech });
  }

  get dot() {
    return arrow({
      id: `${this.id}`,
      senderId: this.sender.dotAddress,
      receiverId: this.receiver.dotAddress,
      style: ["dashed"],
      tooltip: this.notes || this.desc || "",
      label: this.desc ? body(this.desc) : "",
      color: config.relationship.color,
      fontcolor: config.relationship.fontcolor,
      classNames: compact([...(this.tags || []), this.deprecated ? "deprecated" : undefined]),
    });
  }
}
