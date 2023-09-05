import { DashboardIndexGrid } from "./dashboard-index-grid";
import { DashboardWorkflowTable } from "./dashboard-workflow-table";

function DashBoardWorkflowList() {
  return (
    <div className="flex flex-col gap-2">
      <DashboardIndexGrid />
      <DashboardWorkflowTable />
    </div>
  );
}

export { DashBoardWorkflowList };
