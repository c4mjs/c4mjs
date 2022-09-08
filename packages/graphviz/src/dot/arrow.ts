export type ArrowStyle = "dashed";

export type ArrowProperties = {
  readonly id: string;
  readonly senderId: string;
  readonly receiverId: string;
  readonly label: string;
  readonly style: ArrowStyle[];
  readonly color: string;
  readonly fontcolor: string;
};

export const arrow = ({ id, senderId, receiverId, label, style, color, fontcolor }: ArrowProperties) =>
  `${senderId} -> ${receiverId} [ id="${id}", label=<${label}>, style="${style}", color="${color}", fontcolor="${fontcolor}" ]`;
