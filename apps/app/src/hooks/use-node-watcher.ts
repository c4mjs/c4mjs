import { useEffect, useState } from "react";
import { debug } from "../debug";

const d = debug.extend("useNodeWatcher");

export const useNodeWatcher = (isRendering: boolean, ids: string[], onClick: (id: string) => void) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    d("Trying to watch nodes", { ids, isRendering });
    if (document && !isRendering) {
      d("Watching Nodes %s", ids);
      ids.forEach((id) => {
        const e = document.getElementById(id);
        if (!e) debug("Failed to attach event listener to %s", e);
        e?.addEventListener("click", () => {
          d("Click detected on %s", id);
          onClick(id);
        });
        if (e) e.classList.add("zoomable");
        setReady(true);
      });

      return () => {
        d("Unwatching Nodes %s", ids);
        ids.forEach((id) => {
          const e = document.getElementById(id);
          if (!e) debug("Failed to remove event listener to %s", e);
          e?.removeEventListener("click", () => onClick(id));
        });
        setReady(false);
      };
    }
  }, [isRendering, ids, onClick]);

  return ready;
};
