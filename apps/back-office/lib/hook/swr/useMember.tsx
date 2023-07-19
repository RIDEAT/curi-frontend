import useSWR, { useSWRConfig } from "swr";

import { IEmployee, IManager } from "member-types";
import { MemberAPI } from "../../api/member";
import { membersQueryWith } from "../../constant/url";

const useEmployees = (workspaceId: string) => {
  const { mutate } = useSWRConfig();
  const {
    data,
    isLoading,
    error,
    mutate: mutateEmployees,
  } = useSWR<IEmployee[]>(
    workspaceId
      ? [
          MemberAPI.membersEndPoint + membersQueryWith(workspaceId, "employee"),
          workspaceId,
          "employee",
        ]
      : null,
    ([url, workspaceId, type]) => MemberAPI.getMany(workspaceId, type)
  );

  const reloadEmployees = () => {
    mutate([
      MemberAPI.membersEndPoint + membersQueryWith(workspaceId, "employee"),
      workspaceId,
      "employee",
    ]);
  };

  return {
    employees: data,
    isLoading,
    error,
    mutateEmployees,
    reloadEmployees,
  };
};

const useManagers = (workspaceId: string) => {
  const { mutate } = useSWRConfig();
  const {
    data,
    isLoading,
    error,
    mutate: mutateManagers,
  } = useSWR<IManager[]>(
    workspaceId
      ? [
          MemberAPI.membersEndPoint + membersQueryWith(workspaceId, "manager"),
          workspaceId,
          "manager",
        ]
      : null,
    ([url, workspaceId, type]) => MemberAPI.getMany(workspaceId, type)
  );

  const reloadManagers = () => {
    mutate([
      MemberAPI.membersEndPoint + membersQueryWith(workspaceId, "manager"),
      workspaceId,
      "manager",
    ]);
  };

  return {
    managers: data,
    isLoading,
    error,
    mutateManagers,
    reloadManagers,
  };
};

const useMember = (memberId: string) => {
  const {
    data,
    isLoading,
    error,
    mutate: mutateMember,
  } = useSWR<IEmployee>(
    memberId ? [MemberAPI.memberEndPoint + "/" + memberId, memberId] : null,
    ([url, memberId]) => MemberAPI.getOne(memberId)
  );

  return {
    member: data,
    isLoading,
    error,
    mutateMember,
  };
};

export { useEmployees, useManagers, useMember };
