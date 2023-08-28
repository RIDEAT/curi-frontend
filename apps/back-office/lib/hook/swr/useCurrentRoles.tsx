import { useEffect, useState } from "react";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useWorkspaces } from "./useWorkspaces";
import useSWR from "swr";
import { WorkspaceAPI } from "../../api/workspace";
import { EMPLOYEE_NAME } from "../../constant/role";

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
    managerRoles: data?.filter((role) => role.name !== EMPLOYEE_NAME),
    isLoading,
    error,
    currentRolesMutate: mutate,
  };
};

export { useCurrentRoles };
