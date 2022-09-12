export type SubgraphProperties = {
  id: string;
  name: string;
  content: string;
  style?: "dashed";
  color?: string;
  classNames?: string[];
};

export const subgraph = ({
  id,
  name,
  content,
  color = "grey",
  style = "dashed",
  classNames = [],
}: SubgraphProperties) => `subgraph cluster_${id} {
        label = "${name}"
        style = "${style}"
        color = "${color}"
        class="${classNames.join(" ")}"
        margin="50,50"
        
        ${content}
        
    }
`;
