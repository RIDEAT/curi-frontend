import useSWR from "swr";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { LaunchedWorkflowAPI } from "../../api/launchedWorkflow";

const useLaunchedWorkflows = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId
      ? [
          `${LaunchedWorkflowAPI.getLaunchedWorkflowEndPoint(
            currentWorkspaceId
          )}`,
        ]
      : null,
    ([_]) => LaunchedWorkflowAPI.getAll(currentWorkspaceId)
  );

  return {
    launchedWorkflows: data,
    isLoading,
    error,
    launchedWorkflowsMutate: mutate,
  };
};

export { useLaunchedWorkflows };
