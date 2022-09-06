/**
 * @title Relationship
 * @description Defines a Relationship Between a Sender and a Receiver
 */
export interface RelationshipDto {
  /**
   * @title Sender
   * @description ID of the Message Sender
   */
  sender: string;

  /**
   * @title Receiver
   * @description ID of the Message Receiver
   */
  receiver: string;

  /**
   * @title Receiver
   * @description Description of the Message
   */
  desc?: string;

  /**
   * @title tech
   * @description Technology Used
   * @examples ["HTTP"]
   */
  tech?: string;
}
