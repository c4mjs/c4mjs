import { SourceComponentDto } from "./source-component.dto";
import { SourceEntityDto } from "./source-entity.dto";

/**
 * @title Container
 * @description Container inside a workspace System, represents a container for code
 */
export interface SourceContainerDto extends SourceEntityDto {
  /**
   * @title Components
   * @description Container Components
   */
  components?: SourceComponentDto[];
}
