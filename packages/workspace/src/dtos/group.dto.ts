import { SystemDto } from "./system.dto";
import { PersonDto } from "./person.dto";

export interface GroupDto {
  id: string;
  name: string;
  desc?: string;
  tags?: string[];
  people: PersonDto[];
  systems: SystemDto[];
}
