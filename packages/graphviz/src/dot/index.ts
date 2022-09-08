import wrap from "word-wrap";

export const title = (title: string) => `<font point-size="18"><b>${title}</b></font>`;

export const subtitle = (subtitle: string) => `<font point-size="12">${subtitle}</font>`;

export const body = (body: string) => `<font point-size="14">${wrap(body, { width: 30, newline: "<br />" })}</font>`;

export { arrow } from "./arrow";
export { node } from "./node";
export { digraph } from "./digraph";
export { subgraph } from "./subgraph";
export { Renderable } from "./renderable";
