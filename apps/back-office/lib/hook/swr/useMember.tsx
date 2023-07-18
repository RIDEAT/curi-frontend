import useSWR from "swr";

import { IEmployee } from "member-types";
import { MemberAPI } from "../../api/member";
import { membersQueryWith } from "../../constant/url";

const useEmployees = (workspaceId: string) => {
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

  return {
    employees: data,
    isLoading,
    error,
    mutateEmployees,
  };
};

const useManagers = (workspaceId: string) => {
  URLSearchParams;
  const {
    data,
    isLoading,
    error,
    mutate: mutateManagers,
  } = useSWR<IEmployee[]>(
    workspaceId
      ? [
          MemberAPI.membersEndPoint + membersQueryWith(workspaceId, "manager"),
          workspaceId,
          "manager",
        ]
      : null,
    ([url, workspaceId, type]) => MemberAPI.getMany(workspaceId, type)
  );

  return {
    managers: data,
    isLoading,
    error,
    mutateManagers,
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
