export type RelationshipEntity = {
  sender: string;
  receiver: string;
  desc?: string;
  notes?: string;
  tags?: string;
  tech?: string;
  deprecated: boolean;
};
