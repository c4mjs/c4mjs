import { flattenDeep, ListOfRecursiveArraysOrValues } from "lodash";
import { Renderable } from "./renderable";

export const render = (renderables: ListOfRecursiveArraysOrValues<Renderable | string>) =>
  flattenDeep(renderables)
    .map((it) => (typeof it === "string" ? it : it.dot))
    .join("\n");
