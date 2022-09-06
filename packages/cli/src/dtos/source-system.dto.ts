import { SystemDto } from "./system.dto";
import { SourceContainerDto } from "./source-container.dto";

export interface SourceSystemDto extends Omit<SystemDto, "containers" | "relationships"> {
  containers?: SourceContainerDto[];
  deps?: string;
}
