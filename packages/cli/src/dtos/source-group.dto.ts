import { SourceSystemDto } from "./source-system.dto";
import { SourcePersonDto } from "./source-person.dto";

export interface SourceGroupDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  desc?: string;

  tags?: string[];

  people?: SourcePersonDto[];

  systems?: SourceSystemDto[];
}
