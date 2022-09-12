import { Dependecies, Description, External, ID, Name, Tags, Tech } from "./shared";

export interface SourceEntityDto {
  id: ID;
  name: Name;
  desc?: Description;
  tags?: Tags;
  deps?: Dependecies;
  external?: External;
  tech?: Tech;
}
