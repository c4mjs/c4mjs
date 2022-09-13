import { Describable } from "../interfaces/describable";
import { Identifiable } from "../interfaces/identifiable";
import { Externalable } from "../interfaces/externalable";
import { Taggable } from "../interfaces/taggable";
import { Deprecatable } from "../interfaces/deprecatable";

export type EntityType = "person" | "system" | "container";

export interface EntityDto extends Identifiable, Describable, Deprecatable, Taggable, Externalable {
  tech?: string;
  type: EntityType;
}
