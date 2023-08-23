import useSWR from "swr";
import { WorkflowAPI } from "../../api/workflow";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { ISequence } from "workflow-types";
import { useEffect, useState } from "react";

const useWorkflow = (workflowId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [filteredSequences, setFilteredSequences] = useState<ISequence[][]>([]);
  const { data, isLoading, error, mutate } = useSWR(
    workflowId
      ? [WorkflowAPI.getWorkflowsEndPoint(currentWorkspaceId), workflowId]
      : null,
    ([_, workflowId]) => WorkflowAPI.getOne(currentWorkspaceId, workflowId)
  );

  // temporary
  const returnOneorZeroRandom = (num: number) => {
    return num % 2 == 0 ? 1 : 0;
  };

  const getSequences = () => {
    const sequences = data?.sequences || ([] as ISequence[]);
    const sortedSequences = sequences.sort((a, b) => a.dayOffset - b.dayOffset);

    const separatedSequences = [] as ISequence[][];

    sortedSequences.forEach((sequence, index) => {
      if (index == 0) {
        separatedSequences.push([sequence]);
      } else {
        if (sequence.dayOffset == sortedSequences[index - 1].dayOffset) {
          separatedSequences[separatedSequences.length - 1].push(sequence);
        } else {
          separatedSequences.push([sequence]);
        }
      }
    });

    return separatedSequences;
  };

  useEffect(() => {
    if (data) {
      setFilteredSequences(getSequences());
    }
  }, [data]);

  return {
    workflow: data,
    isLoading,
    error,
    workflowMutate: mutate,
    filteredSequences,
  };
};

export { useWorkflow };
