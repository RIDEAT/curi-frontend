import useSWR from "swr";
import { DashboardAPI } from "../../api/dashboard";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useDashboardWorkflowMembers = (workflowId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId && workflowId
      ? [
          DashboardAPI.getDashboardEndPoint(currentWorkspaceId) +
            `/${workflowId}/members`,
        ]
      : null,
    ([_]) => DashboardAPI.getMembersForWorkflow(currentWorkspaceId, workflowId)
  );

  return {
    dashboardWorkflowMembers: data,
    isLoading,
    error,
    dashboardWorkflowMembersMutate: mutate,
  };
};

export { useDashboardWorkflowMembers };
