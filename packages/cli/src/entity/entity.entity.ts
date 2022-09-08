export type EntityEntity = {
  id: string;
  address: string;
  name: string;
  desc?: string;
  tech?: string;
  type: "person" | "system" | "container";
  tags?: string;
  external: boolean;
};
