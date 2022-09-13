import React, { createRef, useEffect, useMemo, useState } from "react";
import "./App.css";
import { AppBar } from "./components/app-bar";
import { Stack } from "@fluentui/react";
import { useRouting } from "./hooks/use-routing";
import { LoadingView } from "./views/loading.view";
import { ErrorView } from "./views/error.view";
import { NavBar } from "./components/nav-bar";
import { SystemView } from "./views/system.view";
import useAxios from "axios-hooks";
import { WorkspaceDto } from "@c4mjs/workspace";

export const App = () => {
  const [expanded, setExpanded] = useState(true);
  const width = useMemo(() => (expanded ? "304px" : "32px"), [expanded]);

  const ref = createRef<HTMLDivElement>();
  const viewport = useMemo(() => ref.current, [ref]);
  const { workspaceUrl, setWorkspaceUrl, path } = useRouting();
  const [{ data: workspace, loading, error }] = useAxios<WorkspaceDto>({
    url: workspaceUrl,
  });

  const groupId = useMemo(() => path.split("/")[2], [path]);
  const systemId = useMemo(() => path.split("/")[4], [path]);
  const containerId = useMemo(() => path.split("/")[6], [path]);

  const viewportHeight = useMemo(() => viewport?.offsetHeight, [viewport]);

  const viewportWidth = useMemo(() => viewport?.offsetWidth, [viewport]);

  useEffect(() => {
    if (workspace?.styles) {
      const customStyles = document.createElement("link");
      customStyles.rel = "stylesheet";
      customStyles.href = workspace?.styles;
      document.head.appendChild(customStyles);

      return () => {
        document.removeChild(customStyles);
      };
    }
  }, [workspace]);

  return (
    <Stack id="page" styles={{ root: { gridTemplateColumns: `${width} auto` } }}>
      <AppBar onLoadSchema={setWorkspaceUrl} schemaLoading={loading} url={workspaceUrl} />
      <NavBar workspace={workspace} expanded={expanded} onToggleExpand={() => setExpanded(!expanded)} />
      <div ref={ref} id="view">
        {/*  /!* Loading State *!/*/}
        {loading && <LoadingView />}

        {/*  /!* Error State *!/*/}
        {error && !loading && <ErrorView error={error.message} />}

        {/* Loaded State */}
        {workspace && !loading && !error && (
          <SystemView
            workspace={workspace}
            groupId={groupId}
            systemId={systemId}
            containerId={containerId}
            height={viewportHeight || 500}
            width={viewportWidth || 500}
          />
        )}
      </div>
    </Stack>
  );
};

export default App;
