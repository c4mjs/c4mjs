import { GroupDto } from "@c4mjs/workspace";
import { SourceSystemDto } from "./source-system.dto";
import { SourcePersonDto } from "./source-person.dto";

export interface SourceGroupDto extends Omit<GroupDto, "systems" | "people"> {
  systems?: SourceSystemDto[];
  people?: SourcePersonDto[];
}
