import React, { useMemo } from "react";
import { Stack, Text, useTheme } from "@fluentui/react";
import { EntityDto, GroupDto, WorkspaceDto } from "@c4mjs/workspace";
import { Graphviz } from "./graphviz";
import { useGraphvizC4 } from "../hooks/use-graphviz-c4";
import _, { isEmpty } from "lodash";
import { containersForSystem } from "../utils/workspace-utils";

export type IContext = {
  workspace: WorkspaceDto;
  group?: GroupDto;
  system?: EntityDto;
  onSystemClick: (systemId: string) => void;
  height: number;
  width: number;
};
export const C4Graph: React.FC<IContext> = ({ workspace, group, system, onSystemClick, height, width }) => {
  const { spacing } = useTheme();

  const dot = useGraphvizC4(workspace, {
    group: group?.id,
    system: system?.id,
  });

  const nodesToWatch = useMemo(
    () =>
      _(workspace.entities)
        .filter({ type: "system" })
        .filter(({ address }) => !isEmpty(containersForSystem(workspace, address)))
        .map(({ address }) => address.replaceAll(".", "__"))
        .value(),
    [workspace]
  );

  return (
    <>
      <Stack className="diagram-title" tokens={{ childrenGap: spacing.s1 }}>
        <Text variant="large">
          <b>
            System {system ? "Container" : "Context"}
            {" : "}
            {group?.name || workspace?.name}
          </b>
        </Text>
        <Text>{group?.desc}</Text>
      </Stack>
      <Graphviz dot={dot} watchNodes={nodesToWatch} onNodeClick={onSystemClick} height={height} width={width} />
    </>
  );
};
