import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useNodeWatcher } from "../hooks/use-node-watcher";
import { isEmpty, noop } from "lodash";

const { graphviz } = require("d3-graphviz");

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
  const [rendering, setRendering] = useState(false);
  const isWatching = useNodeWatcher(rendering, watchNodes, onNodeClick);

  useEffect(() => {
    setTimeout(() => {
      setRendering(true);
      graphviz(graph.current, {
        scale: 0.5,
        zoom: true,
        height: graph.current?.offsetHeight,
        width: graph.current?.offsetWidth,
      })
        .renderDot(dot)
        .on("end", () => {
          setRendering(false);
        });
    }, 500);
  }, [dot]);

  return <div className={"graphviz"} ref={graph} hidden={isEmpty(watchNodes) ? false : !isWatching} />;
};
