import { GroupDto } from "./group.dto";

export interface WorkspaceDto {
  name: string;
  version: string;
  groups: GroupDto[];
}
