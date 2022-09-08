/**
 * An Entity which is Versioned
 */
export interface Versioned {
  /**
   * @title version
   * @description Version for the item
   * @format semver
   *
   * @examples ["1.0.0"]
   */
  version: string;
}
