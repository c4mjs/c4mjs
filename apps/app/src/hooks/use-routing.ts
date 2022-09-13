import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { config } from "../config";

export const useRouting = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { pathname } = useLocation();

  const currSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setWorkspaceUrl = useCallback(
    (url: string) => {
      const searchParams = new URLSearchParams({
        url: encodeURIComponent(url || config.defaultWorkspaceUrl),
      });
      push(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, push]
  );

  useEffect(() => {
    if (!currSearchParams.get("url")) setWorkspaceUrl(config.defaultWorkspaceUrl);
  }, [currSearchParams, setWorkspaceUrl]);

  const navigateTo = (path: string) => {
    push(`${path}?${currSearchParams.toString()}`);
  };

  return {
    workspaceUrl: decodeURIComponent(currSearchParams.get("url") || config.defaultWorkspaceUrl),
    setWorkspaceUrl,
    path: pathname,
    navigateTo,
  };
};
