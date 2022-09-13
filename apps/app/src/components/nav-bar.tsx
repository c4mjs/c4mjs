import React, { useMemo } from "react";
import { IconButton, Stack, useTheme } from "@fluentui/react";
import { WorkspaceDto } from "@c4mjs/workspace";
import { NavBarContent } from "./nav-bar-content";

export type INavBar = { workspace?: WorkspaceDto; expanded: boolean; onToggleExpand: () => void };
export const NavBar: React.FC<INavBar> = ({ workspace, expanded, onToggleExpand }) => {
  const { palette } = useTheme();
  const width = useMemo(() => (expanded ? "304px" : "32px"), [expanded]);

  return (
    <Stack verticalAlign="space-between" styles={{ root: { backgroundColor: palette.neutralLighterAlt } }}>
      <Stack styles={{ root: { overflowY: "auto" } }}>
        {expanded && workspace && <NavBarContent workspace={workspace} />}
      </Stack>
      <Stack horizontalAlign={"end"}>
        <IconButton
          onClick={onToggleExpand}
          styles={{ root: { height: "32px", width } }}
          iconProps={{ iconName: expanded ? "DoubleChevronLeftMed" : "DoubleChevronLeftMedMirrored" }}
        />
      </Stack>
    </Stack>
  );
};
