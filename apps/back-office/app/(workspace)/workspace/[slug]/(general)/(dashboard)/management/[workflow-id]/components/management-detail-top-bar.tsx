import { Button, ErrorBadge, LoadingCircle } from "ui";
import { useDashboardWorkflowMembers } from "../../../../../../../../../lib/hook/swr/useDashboardWorkflowMembers";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCurrentWorkspace } from "../../../../../../../../../lib/hook/useCurrentWorkspace";

function ManagementDetailTopBar({ workflowId }: { workflowId: string }) {
  const router = useRouter();

  const { currentWorkspaceId } = useCurrentWorkspace();
  const { dashboardWorkflowMembers, isLoading, error } =
    useDashboardWorkflowMembers(workflowId);

  const goManagement = () => {
    router.push(`/workspace/${currentWorkspaceId}/management`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <div className="flex justify-between items-center mr-4">
      <div className="w-full flex items-center gap-4 ml-2">
        <Button variant="ghost" onClick={goManagement}>
          <ChevronLeftIcon className="h-6 w-6 text-stone-400" />
        </Button>
        <div className="text-xl font-semibold">
          {dashboardWorkflowMembers?.name || ""}
        </div>
      </div>
    </div>
  );
}

export { ManagementDetailTopBar };
