import { PersonDto } from "./person.dto";

export interface SourcePersonDto extends Omit<PersonDto, "relationships"> {
  deps?: string;
}
