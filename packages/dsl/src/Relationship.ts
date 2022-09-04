import { XmlObject } from "xml";

export class Relationship {
  protected readonly senderId: string;

  protected readonly receiverId: string;

  action: string;

  constructor(senderId: string, receiverId: string, action: string) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.action = action;
  }

  toXmlObject(): XmlObject {
    const _attr: any = { sender: this.senderId, recipient: this.receiverId, action: this.action };
    return { [Relationship.name]: { _attr } };
  }
}
