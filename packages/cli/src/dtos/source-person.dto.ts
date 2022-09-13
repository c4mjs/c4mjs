import { Dependecies, Deprecated, Description, External, ID, Name, Notes, Tags } from "./shared";

/**
 * @title Person
 * @description Person inside a Workspace Group, represents an actor in the Group
 */
export interface SourcePersonDto {
  id: ID;
  name: Name;
  desc?: Description;
  notes?: Notes;
  tags?: Tags;
  deps?: Dependecies;
  external?: External;
  deprecated?: Deprecated;
}
