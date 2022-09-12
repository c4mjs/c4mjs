import { SourceContainerDto } from "./source-container.dto";
import { SourceEntityDto } from "./source-entity.dto";

/**
 * @title System
 * @description System inside a Workspace group, represents a Software System in the Group
 */
export interface SourceSystemDto extends SourceEntityDto {
  /**
   * @title Containers
   * @description System containers
   */
  containers?: SourceContainerDto[];
}
