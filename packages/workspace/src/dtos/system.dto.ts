import { RelationshipDto } from "./relationship.dto";
import { ContainerDto } from "./container.dto";

export interface SystemDto {
  id: string;
  name: string;
  desc?: string;
  external?: boolean;
  tags?: string[];
  containers: ContainerDto[];
  relationships: RelationshipDto[];
}
