import { useEffect, useState } from "react";
import { debug } from "../debug";
import { fromEvent, Subscription } from "rxjs";

const d = debug.extend("useNodeWatcher");

export const useNodeWatcher = (isRendering: boolean, ids: string[], onClick: (id: string) => void) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const subscriptions: Subscription[] = [];
    d("Trying to watch nodes", { ids, isRendering });
    if (document && !isRendering) {
      d("Subscribing to Node Click Events %s", ids);

      ids
        .map((id) => ({ id, element: document.getElementById(id) }))
        .forEach(({ id, element }) => {
          if (!element) {
            debug("Failed to find element with id %S", element);
          } else {
            element.classList.add("zoomable");
            subscriptions.push(
              fromEvent(element, "click").subscribe(() => {
                onClick(id);
              })
            );
          }
        });
      setReady(true);
      return () => {
        d("Unsubscribing from node events");
        subscriptions.forEach((it) => it.unsubscribe());
        setReady(false);
      };
    }
  }, [isRendering, ids, onClick]);

  return ready;
};
