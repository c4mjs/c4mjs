import React from "react";
import { INavLink, INavLinkGroup, Nav, Stack, Text, useTheme } from "@fluentui/react";
import { EntityDto, GroupDto, WorkspaceDto } from "@c4mjs/workspace";
import { useRouting } from "../hooks/use-routing";
import { isEmpty } from "lodash";
import { containersForSystem, systemsForGroup } from "../utils/workspace-utils";

export type INavBarContent = { workspace: WorkspaceDto };
export const NavBarContent: React.FC<INavBarContent> = ({ workspace }) => {
  const { navigateTo } = useRouting();
  const { spacing } = useTheme();

  // const toContainerLinks = (
  //   groupId: string,
  //   systemId: string,
  //   containers: EntityDto[]
  // ): INavLink[] =>
  //   containers.map(({ id, name }) => ({
  //     name,
  //     url: `/groups/${groupId}/systems/${systemId}/containers/${id}`,
  //   }));

  const toSystemLinks = (groupId: string, systems: EntityDto[]): INavLink[] =>
    systems.map(({ id, name }) => ({
      name,
      onClick: (ev) => {
        ev?.preventDefault();
        navigateTo(`/groups/${groupId}/systems/${id}`);
      },
      url: `/groups/${groupId}/systems/${id}`,
      disabled: isEmpty(containersForSystem(workspace, `${groupId}.${id}`)),
      // links: toContainerLinks(groupId, id, containers),
    }));

  const toGroupLinks = (groups: GroupDto[]): INavLinkGroup[] =>
    groups.map(({ id, name }) => ({
      name,
      url: `/group/${id}`,
      links: toSystemLinks(id, systemsForGroup(workspace, id)),
      onHeaderClick: (ev) => {
        ev?.preventDefault();
        navigateTo(`/groups/${id}`);
      },
      isExpanded: true,
    }));

  return (
    <>
      <Stack
        horizontal
        verticalAlign="center"
        horizontalAlign="space-between"
        tokens={{
          padding: spacing.s1,
          childrenGap: spacing.s1,
        }}
      >
        <Text variant="large" className={"link"} onClick={() => navigateTo(`/`)}>
          <b>{workspace.name}</b>
        </Text>
        <Text>v{workspace.version}</Text>
      </Stack>
      <Nav groups={toGroupLinks(workspace.groups)} />
    </>
  );
};
