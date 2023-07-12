import useSWR from "swr";
import { fetcherWithToken } from "../../fetcher/baseFetchers";
import useAuthToken from "../useAuthToken";
import { RESOURSE_API_URL, WORKSPACE_PATH } from "../../constant/url";
import { IWorkspace } from "workspace-types";
import { useEffect, useRef, useState } from "react";

const useUpdateEffect = (callback, dependencies) => {
  const isFirstRender = useRef(false);
  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true;
    } else {
      callback();
    }
  }, dependencies);
};

interface IResponse {
  list: IWorkspace[];
  user: {
    id: string;
  };
}

interface IWorkspaceResponse {
  workspaces: IWorkspace[];
  user: {
    id: string;
  };
}

const useWorkspace = () => {
  const { authToken } = useAuthToken();
  const {
    data,
    isLoading,
    error,
    mutate: mutateWorkspace,
  } = useSWR<IWorkspace[]>(
    authToken ? [RESOURSE_API_URL + WORKSPACE_PATH, authToken] : null,
    ([url, authToken]) =>
      fetcherWithToken(url, authToken, (data: IResponse) => {
        return data.list;
      })
  );

  return {
    workspaces: data,
    isLoading,
    error,
    mutateWorkspace,
  };
};

export default useWorkspace;
