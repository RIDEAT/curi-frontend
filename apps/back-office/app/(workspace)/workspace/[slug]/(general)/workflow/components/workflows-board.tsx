import { ErrorBadge, LoadingCircle } from "ui";
import { WorkflowDisplayCard } from "./workflow-display-card";
import { useWorkflows } from "../../../../../../../lib/hook/swr/useWorkflows";
import { WorkflowCreateDialog } from "./workflow-create-dialog";

function WorkflowsBoard() {
  const { workflows, isLoading, error } = useWorkflows();

  if (isLoading)
    return (
      <div>
        <LoadingCircle />
      </div>
    );
  if (error) return <ErrorBadge />;

  return (
    <div className="flex flex-wrap gap-5">
      <WorkflowCreateDialog />
      {workflows &&
        workflows
          .sort(
            (a, b) =>
              new Date(b.updatedDate).getTime() -
              new Date(a.updatedDate).getTime()
          )
          .map((workflow) => (
            <WorkflowDisplayCard
              key={workflow.id}
              title={workflow.name}
              workflowId={workflow.id}
              createdAt={workflow.createdDate}
              updatedAt={workflow.updatedDate}
              requiredRoles={workflow.requiredRoles}
            />
          ))}
    </div>
  );
}

export { WorkflowsBoard };
