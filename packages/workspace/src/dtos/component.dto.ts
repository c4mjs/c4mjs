import { RelationshipDto } from "./relationship.dto";

export interface ComponentDto {
  id: string;
  name: string;
  desc?: string;
  tech?: string;
  external?: boolean;
  tags?: string[];
  relationships: RelationshipDto[];
}
