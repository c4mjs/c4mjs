import { RelationshipDto } from "../dtos/relationship.dto";

/**
 * An Entity which has Relationships
 */
export interface Relateable {
  relationships: RelationshipDto[];
}
