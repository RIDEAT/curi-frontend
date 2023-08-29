import useSWR from "swr";
import { ContentAPI } from "../../api/content";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { useCurrentWorkflow } from "../useCurrentWorkflow";

const useContent = (sequenceId: string, moduleId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { data, isLoading, error, mutate } = useSWR(
    currentWorkspaceId && currentWorkflowId && sequenceId && moduleId
      ? [
          `${ContentAPI.getContentEndPoint(
            currentWorkspaceId,
            currentWorkflowId,
            sequenceId,
            moduleId
          )}`,
        ]
      : null,
    ([_]) =>
      ContentAPI.getOne(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        moduleId
      )
  );
  return {
    content: data,
    isLoading,
    error,
    contentMutate: mutate,
  };
};

export { useContent };
