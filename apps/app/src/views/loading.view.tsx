import React from "react";
import { MessageBar, MessageBarType, Stack, StackItem } from "@fluentui/react";

export const LoadingView: React.FC = () => {
  return (
    <Stack>
      <StackItem>
        <MessageBar messageBarType={MessageBarType.info}>Loading...</MessageBar>
      </StackItem>
    </Stack>
  );
};
