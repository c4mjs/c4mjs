import { SourceGroupDto } from "./source-group.dto";

export interface SourceWorkspaceDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  /**
   * @format semver
   */
  version: string;

  groups?: SourceGroupDto[];
}
