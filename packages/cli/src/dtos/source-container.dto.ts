import { ContainerDto } from "@c4mjs/workspace";
import { SourceComponentDto } from "./source-component.dto";

export interface SourceContainerDto extends Omit<ContainerDto, "components" | "relationships"> {
  components?: SourceComponentDto[];
  deps?: string;
}
