export type SubgraphProperties = {
  id: string;
  name: string;
  content: string;
  style?: "dashed";
  color?: string;
};

export const subgraph = ({
  id,
  name,
  content,
  color = "grey",
  style = "dashed",
}: SubgraphProperties) => `subgraph cluster_${id} {
        label = "${name}"
        style = "${style}"
        color = "${color}"
        margin="50,50"
        
        ${content}
        
    }
`;
