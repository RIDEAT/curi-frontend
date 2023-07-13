"use client";

import useSWR from "swr";
import { RESOURSE_API_URL, WORKSPACE_PATH } from "../../constant/url";
import { IWorkspace } from "workspace-types";
import { WorkspaceAPI } from "../../api/workspace";

const useWorkspace = () => {
  const {
    data,
    isLoading,
    error,
    mutate: mutateWorkspace,
  } = useSWR<IWorkspace[]>(WorkspaceAPI.endPoint, WorkspaceAPI.get);

  return {
    workspaces: data,
    isLoading,
    error,
    mutateWorkspace,
  };
};

export default useWorkspace;
