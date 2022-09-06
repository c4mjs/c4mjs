import { RelationshipDto } from "./relationship.dto";
import { ComponentDto } from "./component.dto";

export interface ContainerDto {
  id: string;
  name: string;
  desc?: string;
  tech?: string;
  external?: boolean;
  tags?: string[];
  components: ComponentDto[];
  relationships: RelationshipDto[];
}
