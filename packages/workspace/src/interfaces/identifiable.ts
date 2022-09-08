/**
 * An Entity which is Identified and Named
 */
export interface Identifiable {
  /**
   * @pattern ^([a-zA-Z0-9])*$
   */
  id: string;
  name: string;
}
