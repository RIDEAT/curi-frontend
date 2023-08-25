import { useEffect, useState } from "react";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useWorkspaces } from "./useWorkspaces";
import useSWR from "swr";
import { WorkspaceAPI } from "../../api/workspace";

const useCurrentRoles = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${WorkspaceAPI.getRoles(currentWorkspaceId)}`]
      : null,
    ([_]) => WorkspaceAPI.getRoles(currentWorkspaceId)
  );

  return {
    currentRoles: data,
    isLoading,
    error,
    currentRolesMutate: mutate,
  };
};

export { useCurrentRoles };
