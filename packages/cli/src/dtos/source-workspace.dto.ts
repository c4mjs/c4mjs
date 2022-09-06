import { WorkspaceDto } from "./workspace.dto";
import { SourceGroupDto } from "./source-group.dto";

export interface SourceWorkspaceDto extends Omit<WorkspaceDto, "groups"> {
  groups?: SourceGroupDto[];
}
