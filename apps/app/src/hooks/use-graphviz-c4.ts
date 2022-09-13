import { WorkspaceDto } from "@c4mjs/workspace";
import { GraphvizC4 } from "@c4mjs/graphviz";
import { useMemo } from "react";

export type Config = {
  group?: string;
  system?: string;
};

/**
 * Hook to return the appropriate C4 Context Diagram based on what is desired
 *
 * By default the entire workspace is rendered,
 *  - if a group is provided then the context in relation to all systems in that group is returned
 *  - if a system is provided then the container for that system is returned
 * @param workspace
 * @param group
 * @param system
 */
export const useGraphvizC4 = (workspace: WorkspaceDto, { group, system }: Config) => {
  const ws = useMemo(() => new GraphvizC4(workspace), [workspace]);

  return useMemo(() => {
    if (group && system) return ws.getContainerDiagram(system);
    return ws.getContextDiagram(group);
  }, [group, system, ws]);
};
