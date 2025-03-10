"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Button, ErrorBadge, LoadingCircle } from "ui";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { SequenceCreateDialog } from "./sequence-create-dialog";

function EditorTopBar() {
  const router = useRouter();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflow, isLoading, error } = useWorkflow(currentWorkflowId);

  const goWorkflowManager = () => {
    // router.push(`/workspace/${currentWorkspaceId}/workflow`);
    router.back();
  };

  if (isLoading)
    return (
      <div className="w-full flex justify-center">
        <LoadingCircle />
      </div>
    );
  if (error) return <ErrorBadge />;

  return (
    <div className="flex justify-between items-center mr-4">
      <div className="w-full flex items-center gap-4 ml-2">
        <Button variant="ghost" onClick={goWorkflowManager}>
          <ChevronLeftIcon className="h-6 w-6 text-stone-400" />
        </Button>
        <div className="text-xl font-semibold">{workflow?.name || ""}</div>
      </div>
    </div>
  );
}

export { EditorTopBar };
