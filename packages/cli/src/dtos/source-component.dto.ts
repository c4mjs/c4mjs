import { ComponentDto } from "@c4mjs/workspace";

export interface SourceComponentDto extends Omit<ComponentDto, "relationships"> {
  deps?: string;
}
