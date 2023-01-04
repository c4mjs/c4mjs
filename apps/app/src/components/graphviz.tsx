import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { isEmpty, noop } from "lodash";
import { graphviz } from "d3-graphviz";
import { useNodeWatcher } from "../hooks/use-node-watcher";
import { getDebug } from "../debug";

const debug = getDebug("Graphviz");

export interface IGraphvizProps {
  dot: string;
  options?: any;
  watchNodes?: string[];
  onNodeClick?: (nodeId: string) => void;
  height: number;
  width: number;
}
export const Graphviz = ({ dot, watchNodes = [], onNodeClick = noop }: IGraphvizProps) => {
  const graph = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(true);
  const isWatching = useNodeWatcher(rendering, watchNodes, onNodeClick);

  useEffect(() => {
    if (!dot || !graph.current) return;
    setRendering(true);
    debug("Rendering Graph");

    graphviz(graph.current, {
      scale: 0.5,
      zoom: true,
      height: graph.current?.offsetHeight,
      width: graph.current?.offsetWidth,
    })
      .renderDot(dot)
      .on("renderEnd", () => {
        setTimeout(() => {
          debug("Rendering Complete");
          setRendering(false);
        }, 250);
      });
  }, [dot, graph.current]);

  return <div className={"graphviz"} ref={graph} hidden={isEmpty(watchNodes) ? false : !isWatching} />;
};
