"use client";

import { SequenceCreateDialog } from "./sequence-create-dialog";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";

function Timeline() {
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflow, isLoading, error } = useWorkflow(currentWorkflowId);

  return (
    <div className="h-[90vh] overflow-scroll">
      <SequenceCreateDialog />
      {workflow?.sequences?.map((sequence) => (
        <div key={sequence.id}>
          <div>{sequence.id}</div>
          <div>{sequence.name}</div>
          <div>{sequence.role.id}</div>
          <div>{sequence.role.name}</div>
        </div>
      ))}
    </div>
  );
}

export { Timeline };
