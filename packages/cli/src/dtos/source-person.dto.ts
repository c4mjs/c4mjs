import { Dependecies, Description, External, ID, Name, Tags } from "./shared";

/**
 * @title Person
 * @description Person inside a Workspace Group, represents an actor in the Group
 */
export interface SourcePersonDto {
  id: ID;
  name: Name;
  desc?: Description;
  tags?: Tags;
  deps?: Dependecies;
  external?: External;
}
