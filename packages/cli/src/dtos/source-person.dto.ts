export interface SourcePersonDto {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;

  name: string;

  desc?: string;

  tags?: string[];

  deps?: string;

  external?: boolean;
}
