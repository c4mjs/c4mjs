import { ComponentDto } from "./component.dto";

export interface SourceComponentDto extends Omit<ComponentDto, "relationships"> {
  deps?: string;
}
