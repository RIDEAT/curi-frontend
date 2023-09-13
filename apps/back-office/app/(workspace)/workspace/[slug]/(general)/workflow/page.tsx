"use client";

import withAuth from "../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../components/top-title-desc";
import { WorkflowControlButtons } from "./components/workflow-control-buttons";
import { WorkflowsBoard } from "./components/workflows-board";

export default withAuth(Workflow, "protected");
function Workflow() {
  return (
    <>
      <TopTitleDesc
        title="워크플로우 매니저"
        description="모든 워크플로우를 조회하고, 워크플로우로 온보딩을 시작할 수 있습니다."
        SideButton={<WorkflowControlButtons />}
      >
        <div className="h-full overflow-scroll scrollbar-hide pb-5">
          <WorkflowsBoard />
        </div>
      </TopTitleDesc>
    </>
  );
}
