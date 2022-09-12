import { SourceSystemDto } from "./source-system.dto";
import { SourcePersonDto } from "./source-person.dto";
import { ID, Name, Tags } from "./shared";

/**
 * @title Group
 * @description Workspace Group, sits inside a workspace to logically break up parts
 */
export interface SourceGroupDto {
  id: ID;
  name: Name;
  tags?: Tags;

  /**
   * @title People
   * @description People in the Group
   */
  people?: SourcePersonDto[];

  /**
   * @title Systems
   * @description Software Systems in the Group
   */
  systems?: SourceSystemDto[];
}
