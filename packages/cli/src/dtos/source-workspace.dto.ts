import { SourceGroupDto } from "./source-group.dto";
import { ID } from "./shared";

/**
 * @title Workspace
 * @description Workspace object, sits at the top level
 */
export interface SourceWorkspaceDto {
  id: ID;
  name: string;
  version: string;

  /**
   * @title Groups
   * @description Workspace groups
   */
  groups?: SourceGroupDto[];
}
