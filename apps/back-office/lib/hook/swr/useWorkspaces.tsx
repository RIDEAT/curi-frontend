import useSWR from "swr";

import { IWorkspace } from "workspace-types";
import { WorkspaceAPI } from "../../api/workspace";

const useWorkspaces = () => {
  const {
    data,
    isLoading,
    error,
    mutate: mutateWorkspace,
  } = useSWR<IWorkspace[]>(
    WorkspaceAPI.workspacesEndPoint,
    WorkspaceAPI.getAll
  );

  const getCurrentWorkspaceData = (workspaceId: string) => {
    const currentWorkspace = data?.filter(
      (workspace) => workspace.id == workspaceId
    );
    return currentWorkspace?.[0];
  };

  const getRolesInWorkspace = (workspaceId: string) => {
    const currentWorkspace = data?.filter(
      (workspace) => workspace.id == workspaceId
    );
    data?.filter((workspace) => workspace.id == workspaceId);
    const roles = currentWorkspace?.[0].roles;
    return roles;
  };

  return {
    workspaces: data,
    isLoading,
    error,
    mutateWorkspace,
    getRolesInWorkspace,
    getCurrentWorkspaceData,
  };
};

export { useWorkspaces };
