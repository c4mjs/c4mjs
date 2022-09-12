import { config } from "../config";
import { arrow, body, Renderable } from "../dot";
import { Entity } from "./entity";
import { Scope } from "./scope";

let ID_SEQ = 100_000;

export class Relationship implements Renderable {
  readonly id: string;

  constructor(
    public sender: Entity,
    public receiver: Entity,
    public readonly desc?: string,
    public readonly tech?: string
  ) {
    this.id = `${ID_SEQ++}`;
  }

  get scope(): Scope {
    if (this.sender.type === "container" || this.receiver.type === "container") return Scope.CONTAINER;

    return Scope.CONTEXT;
  }

  get dot() {
    return arrow({
      id: `${this.id}`,
      senderId: this.sender.dotAddress,
      receiverId: this.receiver.dotAddress,
      style: ["dashed"],
      label: this.desc ? body(this.desc) : "",
      color: config.relationship.color,
      fontcolor: config.relationship.fontcolor,
    });
  }
}
