import { RelationshipDto } from "./relationship.dto";

export interface PersonDto {
  id: string;
  name: string;
  desc?: string;
  tags?: string[];
  relationships: RelationshipDto[];
}
