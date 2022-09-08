import { Identifiable } from "../interfaces/identifiable";
import { Describable } from "../interfaces/describable";
import { Taggable } from "../interfaces/taggable";

export interface GroupDto extends Identifiable, Describable, Taggable {}
