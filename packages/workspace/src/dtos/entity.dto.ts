import { Describable } from "../interfaces/describable";
import { Identifiable } from "../interfaces/identifiable";
import { Externalable } from "../interfaces/externalable";
import { Taggable } from "../interfaces/taggable";
import { Deprecatable } from "../interfaces/deprecatable";
import { Clusterable } from "../interfaces/clusterable";

export type EntityType = "person" | "system" | "container";

export interface EntityDto extends Identifiable, Describable, Deprecatable, Clusterable, Taggable, Externalable {
  tech?: string;
  type: EntityType;
}
