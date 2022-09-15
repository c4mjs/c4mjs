import React from "react";
import { Image, Stack } from "@fluentui/react";

export const LoadingView: React.FC = () => {
  return (
    <Stack>
      <Image src={"/navigation.gif"} height={128} width={128} />
    </Stack>
  );
};
