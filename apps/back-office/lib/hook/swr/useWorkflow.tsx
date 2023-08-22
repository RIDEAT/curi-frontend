import useSWR from "swr";
import { WorkflowAPI } from "../../api/workflow";
import { useCurrentWorkspace } from "../useCurrentWorkspace";

const useWorkflow = (workflowId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { data, isLoading, error, mutate } = useSWR(
    workflowId
      ? [WorkflowAPI.getWorkflowsEndPoint(currentWorkspaceId), workflowId]
      : null,
    ([_, workflowId]) => WorkflowAPI.getOne(currentWorkspaceId, workflowId)
  );

  return {
    workflow: data,
    isLoading,
    error,
    workflowMutate: mutate,
  };
};

export { useWorkflow };
