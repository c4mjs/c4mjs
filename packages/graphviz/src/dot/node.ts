export type NodeShape = "rect";
export type NodeStyle = "filled" | "rounded";

export type NodeProperties = {
  readonly id: string;
  readonly shape: NodeShape;
  readonly label: string;
  readonly style: NodeStyle[];
  readonly color: string;
  readonly fillcolor: string;
  readonly fontcolor: string;
};

export const node = ({ id, shape, label, style, color, fillcolor, fontcolor }: NodeProperties) => `${id} [
        id="${id}",
        shape="${shape}",
        label=<${label}>,
        style="${style.join(",")}",
        color="${color}",
        fillcolor="${fillcolor}",
        fontcolor="${fontcolor}"
    ]`;
