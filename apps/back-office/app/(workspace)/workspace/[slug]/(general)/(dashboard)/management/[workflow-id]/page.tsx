"use client";

import withAuth from "../../../../../../../../components/hoc/withAuth";
import { ManagementDetailMemberTable } from "./components/management-detail-member-table";

export default withAuth(LaunchedWorkflowDetail, "protected");
function LaunchedWorkflowDetail({
  params,
}: {
  params: { "workflow-id": string };
}) {
  return (
    <div>
      <ManagementDetailMemberTable workflowId={params["workflow-id"]} />
    </div>
  );
}
