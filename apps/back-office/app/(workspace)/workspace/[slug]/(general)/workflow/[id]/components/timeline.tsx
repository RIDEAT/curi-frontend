"use client";

import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { TimeBoxes } from "./time-box";
import { ErrorBadge, LoadingCircle } from "ui";

function Timeline() {
  const { currentWorkflowId } = useCurrentWorkflow();
  const { isLoading, error, filteredSequences } =
    useWorkflow(currentWorkflowId);

  if (isLoading)
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  if (error) return <ErrorBadge />;

  return (
    <div className="min-w-[800px] h-[90vh] overflow-scroll">
      <div className="w-full flex flex-col items-center">
        {filteredSequences.length > 0 &&
          filteredSequences?.map((sequences) => (
            <TimeBoxes
              key={sequences[0].dayOffset}
              date={sequences[0].dayOffset.toString()}
              sequences={sequences}
            />
          ))}
      </div>
    </div>
  );
}

export { Timeline };
