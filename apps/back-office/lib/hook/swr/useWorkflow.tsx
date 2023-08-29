import useSWR from "swr";
import { WorkflowAPI } from "../../api/workflow";
import { useCurrentWorkspace } from "../useCurrentWorkspace";
import { ISequence } from "workflow-types";
import { useEffect, useState } from "react";
import { IRole } from "workspace-types";
import { EMPLOYEE_NAME } from "../../constant/role";

const useWorkflow = (workflowId: string) => {
  const { currentWorkspaceId } = useCurrentWorkspace();

  const [filteredSequences, setFilteredSequences] = useState<ISequence[][]>([]);
  const [requiredRoles, setRequiredRoles] = useState<IRole[]>([]);

  const { data, isLoading, error, mutate } = useSWR(
    workflowId && currentWorkspaceId
      ? [WorkflowAPI.getWorkflowsEndPoint(currentWorkspaceId), workflowId]
      : null,
    ([_, workflowId]) => WorkflowAPI.getOne(currentWorkspaceId, workflowId)
  );

  const getSequences = () => {
    if (!data) return [];

    const sequences = [...data?.sequences] || ([] as ISequence[]);
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
      setRequiredRoles(
        data.requiredRoles.filter((role) => role.name !== EMPLOYEE_NAME)
      );
    }
  }, [data]);

  return {
    workflow: data,
    requiredRoles,
    isLoading,
    error,
    workflowMutate: mutate,
    filteredSequences,
  };
};

export { useWorkflow };
