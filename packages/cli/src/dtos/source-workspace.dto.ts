import { WorkspaceDto } from "@c4mjs/workspace";
import { SourceGroupDto } from "./source-group.dto";

export interface SourceWorkspaceDto extends Omit<WorkspaceDto, "groups"> {
  groups?: SourceGroupDto[];
}
