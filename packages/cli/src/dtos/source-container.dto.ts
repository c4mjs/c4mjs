import { SourceComponentDto } from "./source-component.dto";

export interface SourceContainerDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  desc?: string;

  tags?: string[];

  tech?: string;

  components?: SourceComponentDto[];

  deps?: string;

  external?: boolean;
}
