import { Cluster, Dependecies, Deprecated, Description, External, ID, Name, Notes, Tags, Tech } from "./shared";

export interface SourceEntityDto {
  id: ID;
  name: Name;
  desc?: Description;
  notes?: Notes;
  tags?: Tags;
  deps?: Dependecies;
  external?: External;
  deprecated?: Deprecated;
  tech?: Tech;
  cluster?: Cluster;
}
