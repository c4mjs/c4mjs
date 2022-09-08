export interface SourceComponentDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  desc?: string;

  tags?: string[];

  tech?: string;

  deps?: string;

  external?: boolean;
}
