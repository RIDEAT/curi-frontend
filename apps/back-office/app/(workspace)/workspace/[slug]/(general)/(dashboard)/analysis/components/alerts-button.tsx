import { Alert, AlertDescription, AlertTitle, Button } from "ui";
import { useRouter } from "next/navigation";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { DivideIcon } from "lucide-react";

export function AlertsButton() {
  const router = useRouter();
  const { currentWorkspaceId } = useCurrentWorkspace();

  const enterWorkflowEditor = (workflowId: string) => {
    router.push(`/workspace/${currentWorkspaceId}/analysis/alert`);
  };

  return (
    <Button asChild className="w-auto h-auto">
      <div
        className="flex flex-col items-center"
        onClick={() => enterWorkflowEditor(currentWorkspaceId)}
      >
        <span>시퀀스 미수행 멤버</span>
        <span className="text-4xl font-semibold">4</span>
      </div>
    </Button>
  );
}
