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

  const getRolesInWorkspace = (workspaceId: string) => {
    console.log("workspaceId: ", workspaceId);
    console.log("data: ", data);
    const currentWorkspace = data?.filter(
      (workspace) => workspace.id == workspaceId
    );
    console.log("currentWorkspace: ", currentWorkspace);
    // const roles = currentWorkspace[0].roles;
    const roles = [
      {
        id: 1,
        name: "CEO",
      },
      {
        id: 2,
        name: "CTO",
      },
    ];
    console.log("getRolesInWorkspace roles: ", roles);
    return roles;
  };

  return {
    workspaces: data,
    isLoading,
    error,
    mutateWorkspace,
    getRolesInWorkspace,
  };
};

export { useWorkspaces };
