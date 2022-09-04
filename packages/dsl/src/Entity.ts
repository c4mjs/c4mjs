import { Base } from "./Base";
import { Relationship } from "./Relationship";

export abstract class Entity extends Base {
  desc?: string;

  external?: boolean;

  protected readonly relationships: Relationship[];

  protected constructor(name: string) {
    super(name);
    this.relationships = [];
  }

  /**
   * Create a new Relationship Between the Entity and a Receiver
   * @param receiver {string | Entity} Receving entity of the relationship, either the id or Entity refernce
   * @param action {string} Relationship Action Summary
   */
  calls(receiver: string | Entity, action: string): Relationship {
    const receiverId = typeof receiver === "string" ? receiver : receiver.id;
    const rel = new Relationship(this.id, receiverId, action);
    this.relationships.push(rel);
    return rel;
  }

  /**
   * Create a new Relationship Between the Entity and a Sender
   * @param sender {string | Entity} Sending entity of the relationship, either the id or Entity refernce
   * @param action {string} Relationship Action Summary
   */
  receives(sender: string | Entity, action: string): Relationship {
    const senderId = typeof sender === "string" ? sender : sender.id;
    const rel = new Relationship(senderId, this.id, action);
    this.relationships.push(rel);
    return rel;
  }
}
