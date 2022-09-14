import { SourceGroupDto } from "./source-group.dto";
import { ID, Name, Styles, Version } from "./shared";

/**
 * @title Workspace
 * @description Workspace object, sits at the top level
 */
export interface SourceWorkspaceDto {
  id: ID;
  name: Name;
  version: Version;
  styles?: Styles;

  /**
   * @title Groups
   * @description Workspace groups
   */
  groups?: SourceGroupDto[];
}
