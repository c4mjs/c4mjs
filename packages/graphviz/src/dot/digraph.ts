import { config } from "../config";

export type DigraphProperties = {
  content: string;
};
export const digraph = ({ content }: DigraphProperties) => `digraph {
    compound=true
    graph [fontname="${config.fontname}", rankdir=TB, ranksep=1.0, nodesep=1.0]
    node [fontname="${config.fontname}", shape=box, margin="0.3,0.3"]
    edge [fontname="${config.fontname}"]

    ${content}
     
}`;
