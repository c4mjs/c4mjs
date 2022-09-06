import { PersonDto } from "@c4mjs/workspace";

export interface SourcePersonDto extends Omit<PersonDto, "relationships"> {
  deps?: string;
}
