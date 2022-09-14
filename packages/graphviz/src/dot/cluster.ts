export type ClusterProperties = {
  id: string;
  content: string;
  classNames?: string[];
};

export const cluster = ({ id, content, classNames = [] }: ClusterProperties) => `subgraph cluster_${id} {
        label = ""
        style = "invis"
        color = ""
        class="${classNames.join(" ")}"
        margin="50,50"
        
        ${content}
        
    }
`;
