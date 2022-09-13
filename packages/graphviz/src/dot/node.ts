export type NodeShape = "rectangle" | "cylinder";
export type NodeStyle = "filled" | "rounded";

export type NodeProperties = {
  id: string;
  shape: NodeShape;
  label: string;
  tooltip: string;
  style: NodeStyle[];
  color: string;
  fillcolor: string;
  fontcolor: string;
  classNames?: string[];
};

export const node = ({
  id,
  shape,
  label,
  tooltip,
  style,
  color,
  fillcolor,
  fontcolor,
  classNames = [],
}: NodeProperties) => `${id} [
        id="${id}",
        shape="${shape}",
        label=<${label}>,
        tooltip=<${tooltip}>
        style="${style.join(",")}",
        color="${color}",
        fillcolor="${fillcolor}",
        fontcolor="${fontcolor}"
        class="${classNames.join(" ")}"
    ]`;
