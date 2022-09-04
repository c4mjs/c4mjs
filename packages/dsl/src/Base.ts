import { random, camelCase } from "lodash";

export abstract class Base {
  readonly id: string;

  readonly name: string;

  protected constructor(name: string) {
    this.name = name;
    this.id = `${camelCase(name)}-${random(100_000, 999_999)}`;
  }
}
