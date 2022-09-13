import { EntityDto, GroupDto, WorkspaceDto } from "@c4mjs/workspace";
import { find } from "lodash";

export const getParentAddress = (address: string) => address.split(".").slice(0, -1).join(".");

export const getGroup = (workspace: WorkspaceDto, id: string): GroupDto | undefined => find(workspace.groups, { id });

export const getEntity = (workspace: WorkspaceDto, address: string): EntityDto | undefined =>
  find(workspace.entities, { address });

export const systemsForGroup = (workspace: WorkspaceDto, parentAddress: string): EntityDto[] =>
  workspace.entities.filter(({ type, address }) => type === "system" && getParentAddress(address) === parentAddress);

export const containersForSystem = (workspace: WorkspaceDto, parentAddress: string): EntityDto[] =>
  workspace.entities.filter(({ type, address }) => type === "container" && getParentAddress(address) === parentAddress);
