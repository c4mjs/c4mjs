import React from "react";
import { MessageBar, MessageBarType, Stack, StackItem } from "@fluentui/react";

export type IErrorView = { error: string };
export const ErrorView: React.FC<IErrorView> = ({ error }) => {
  return (
    <Stack>
      <StackItem>
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      </StackItem>
    </Stack>
  );
};
