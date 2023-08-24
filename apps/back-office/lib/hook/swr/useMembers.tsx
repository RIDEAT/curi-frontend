import useSWR from "swr";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { MemberAPI } from "../../api/member";
import { IEmployee } from "member-types";

const useEmployees = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${MemberAPI.getMembersEndPoint(currentWorkspaceId)}?type=employee`]
      : null,
    ([_]) => MemberAPI.getAll(currentWorkspaceId, "employee")
  );

  return {
    employees: data as IEmployee[],
    isLoading,
    error,
    employeeMutate: mutate,
  };
};

const useManagers = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${MemberAPI.getMembersEndPoint(currentWorkspaceId)}?type=manager`]
      : null,
    ([_]) => MemberAPI.getAll(currentWorkspaceId, "manager")
  );

  return {
    managers: data,
    isLoading,
    error,
    managerMutate: mutate,
  };
};

export { useEmployees, useManagers };
