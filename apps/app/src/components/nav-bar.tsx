import React from "react";
import { Stack, useTheme } from "@fluentui/react";
import { WorkspaceDto } from "@c4mjs/workspace";
import { NavBarContent } from "./nav-bar-content";

export type INavBar = { workspace?: WorkspaceDto };
export const NavBar: React.FC<INavBar> = ({ workspace }) => {
  const { palette } = useTheme();

  return (
    <Stack
      styles={{
        root: {
          backgroundColor: palette.neutralLighterAlt,
          borderRight: palette.neutralLight,
          borderRightStyle: "solid",
          overflowY: "auto",
        },
      }}
    >
      {workspace && <NavBarContent workspace={workspace} />}
    </Stack>
  );
};
