import { ContainerDto } from "./container.dto";
import { SourceComponentDto } from "./source-component.dto";

export interface SourceContainerDto extends Omit<ContainerDto, "components" | "relationships"> {
  components?: SourceComponentDto[];
  deps?: string;
}
