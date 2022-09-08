import { Identifiable } from "../interfaces/identifiable";
import { Describable } from "../interfaces/describable";
import { Taggable } from "../interfaces/taggable";
import { PersonDto } from "./person.dto";
import { SystemDto } from "./system.dto";

export interface GroupDto extends Identifiable, Describable, Taggable {
  people: PersonDto[];
  systems: SystemDto[];
}
