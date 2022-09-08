import { Identifiable } from "../interfaces/identifiable";
import { Describable } from "../interfaces/describable";
import { Externalable } from "../interfaces/externalable";
import { Taggable } from "../interfaces/taggable";
import { Relateable } from "../interfaces/relateable";

export interface ComponentDto extends Identifiable, Describable, Externalable, Taggable, Relateable {
  tech?: string;
}
