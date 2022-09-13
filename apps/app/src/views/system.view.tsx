import React, { useMemo } from "react";
import { WorkspaceDto } from "@c4mjs/workspace";
import { C4Graph } from "../components/c4-graph";
import { useRouting } from "../hooks/use-routing";
import { Breadcrumb, IBreadcrumbItem, Stack, useTheme } from "@fluentui/react";
import { getEntity, getGroup } from "../utils/workspace-utils";

export type IDefinition = {
  workspace: WorkspaceDto;
  groupId?: string;
  systemId?: string;
  containerId?: string;
  height: number;
  width: number;
};
export const SystemView: React.FC<IDefinition> = ({ workspace, groupId, systemId, containerId, height, width }) => {
  const { spacing } = useTheme();
  const { navigateTo } = useRouting();

  const group = useMemo(() => (groupId && getGroup(workspace, groupId)) || undefined, [workspace, groupId]);
  const system = useMemo(
    () => (groupId && systemId && getEntity(workspace, `${groupId}.${systemId}`)) || undefined,
    [workspace, groupId, systemId]
  );
  const container = useMemo(
    () =>
      (groupId && systemId && containerId && getEntity(workspace, `${groupId}.${systemId}.${containerId}`)) ||
      undefined,
    [groupId, systemId, containerId, workspace]
  );

  const handleSystemClick = (address: string) => {
    const [groupId, systemId] = address.split("__");
    navigateTo(`/groups/${groupId}/systems/${systemId}`);
  };

  const breadcrumbs = useMemo(() => {
    const items: IBreadcrumbItem[] = [
      {
        key: workspace.name,
        text: workspace.name,
        onClick: () => navigateTo("/"),
      },
    ];

    if (group) {
      items.push({
        key: group.id,
        text: group.name,
        onClick: () => navigateTo(`/groups/${group.id}`),
      });
    }

    if (group && system) {
      items.push({
        key: system.id,
        text: system.name,
        onClick: () => navigateTo(`/groups/${group.id}/systems/${system.id}`),
      });
    }

    if (group && system && container) {
      items.push({
        key: container.id,
        text: container.name,
        onClick: () => navigateTo(`/groups/${group.id}/systems/${system.id}/containers/${container.id}`),
      });
    }

    return items;
  }, [workspace.name, group, system, container, navigateTo]);

  return (
    <>
      <Stack tokens={{ padding: spacing.s1 }}>
        <Breadcrumb items={breadcrumbs} />
      </Stack>
      <C4Graph
        workspace={workspace}
        group={group}
        system={system}
        onSystemClick={handleSystemClick}
        height={height}
        width={width}
      />
      )
    </>
  );
};
