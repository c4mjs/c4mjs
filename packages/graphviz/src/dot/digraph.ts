import { config } from "../config";

export type DigraphProperties = {
  content: string;
};
export const digraph = ({ content }: DigraphProperties) => `digraph { 
    graph [fontname="${config.fontname}", fontsize=24, rankdir=TB, ranksep=2.0, nodesep=1, splines=line ]
    node [fontname="${config.fontname}", shape=box, margin="0.3,0.3"]
    edge [fontname="${config.fontname}"]

    ${content}
     
}`;
