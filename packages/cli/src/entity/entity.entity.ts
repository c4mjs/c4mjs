export type EntityEntity = {
  id: string;
  address: string;
  name: string;
  desc?: string;
  notes?: string;
  tech?: string;
  type: "person" | "system" | "container";
  tags?: string;
  external: boolean;
  deprecated: boolean;
  cluster?: string;
};
