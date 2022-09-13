export type ArrowStyle = "dashed";

export type ArrowProperties = {
  id: string;
  senderId: string;
  receiverId: string;
  label: string;
  tooltip: string;
  style: ArrowStyle[];
  color: string;
  fontcolor: string;
  classNames?: string[];
};

export const arrow = ({
  id,
  senderId,
  receiverId,
  label,
  tooltip,
  style,
  color,
  fontcolor,
  classNames = [],
}: ArrowProperties) =>
  `${senderId} -> ${receiverId} [ id="${id}", label=<${label}>, tooltip=<${tooltip}> labeltooltip=<${tooltip}> style="${style}", color="${color}", fontcolor="${fontcolor}" class="${classNames.join(
    " "
  )}"
 ]`;
