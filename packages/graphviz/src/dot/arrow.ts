export type ArrowStyle = "dashed";

export type ArrowProperties = {
  id: string;
  senderId: string;
  receiverId: string;
  label: string;
  style: ArrowStyle[];
  color: string;
  fontcolor: string;
  classNames?: string[];
};

export const arrow = ({ id, senderId, receiverId, label, style, color, fontcolor, classNames = [] }: ArrowProperties) =>
  `${senderId} -> ${receiverId} [ id="${id}", label=<${label}>, style="${style}", color="${color}", fontcolor="${fontcolor}" class="${classNames.join(
    " "
  )}"
 ]`;
