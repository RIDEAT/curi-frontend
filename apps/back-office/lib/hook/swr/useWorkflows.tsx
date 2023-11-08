import useSWR from "swr";

import { WorkflowAPI } from "../../api/workflow";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useWorkflows = () => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    [WorkflowAPI.getWorkflowsEndPoint(currentWorkspaceId), currentWorkspaceId],
    ([_, currentWorkspaceId]) => WorkflowAPI.getAll(currentWorkspaceId)
  );

  return {
    workflows: data,
    isLoading,
    error,
    workflowsMutate: mutate,
  };
};

export { useWorkflows };
