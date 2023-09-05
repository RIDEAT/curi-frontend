import useSWR from "swr";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { DashboardAPI } from "../../api/dashboard";

const useDashboardWorkflows = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [`${DashboardAPI.getDashboardEndPoint(currentWorkspaceId)}`]
      : null,
    ([_]) => DashboardAPI.getAllWorkflows(currentWorkspaceId)
  );

  return {
    dashboardWorkflows: data,
    isLoading,
    error,
    workflowMutate: mutate,
  };
};

export { useDashboardWorkflows };
