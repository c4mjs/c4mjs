import { SourceContainerDto } from "./source-container.dto";

export interface SourceSystemDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  desc?: string;

  tags?: string[];

  containers?: SourceContainerDto[];

  deps?: string;

  external?: boolean;
}
