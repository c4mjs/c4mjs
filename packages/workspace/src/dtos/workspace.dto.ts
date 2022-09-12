import { Versioned } from "../interfaces/versioned";
import { Identifiable } from "../interfaces/identifiable";
import { GroupDto } from "./group.dto";
import { EntityDto } from "./entity.dto";
import { RelationshipDto } from "./relationship.dto";

export interface WorkspaceDto extends Omit<Identifiable, "address">, Versioned {
  styles?: string;
  groups: GroupDto[];
  entities: EntityDto[];
  relationships: RelationshipDto[];
}
