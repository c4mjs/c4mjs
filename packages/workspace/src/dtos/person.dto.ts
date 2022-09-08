import { Identifiable } from "../interfaces/identifiable";
import { Taggable } from "../interfaces/taggable";
import { Describable } from "../interfaces/describable";
import { Relateable } from "../interfaces/relateable";
import { Externalable } from "../interfaces/externalable";

export interface PersonDto extends Identifiable, Describable, Externalable, Taggable, Relateable {}
