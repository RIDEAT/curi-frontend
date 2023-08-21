import useSWR from "swr";

import { IWorkspace } from "workspace-types";
import { WorkspaceAPI } from "../../api/workspace";
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
    workflowMutate: mutate,
  };
};

export { useWorkflows };
