import { config } from "../config";
import { arrow, body, Renderable } from "../dot";
import { Entity } from "./entity";

let ID_SEQ = 100_000;

export class Relationship implements Renderable {
  readonly id: string;

  constructor(
    public readonly sender: Entity,
    public readonly receiver: Entity,
    public readonly desc?: string,
    public readonly tech?: string
  ) {
    this.id = `${ID_SEQ++}`;
  }

  get dot() {
    return arrow({
      id: `${this.id}`,
      senderId: this.sender.id,
      receiverId: this.receiver.id,
      style: ["dashed"],
      label: this.desc ? body(this.desc) : "",
      color: config.relationship.color,
      fontcolor: config.relationship.fontcolor,
    });
  }
}
