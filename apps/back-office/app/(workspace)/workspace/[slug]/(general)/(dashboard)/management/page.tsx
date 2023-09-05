"use client";

import withAuth from "../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../components/top-title-desc";
import { DashBoardWorkflowList } from "./components/dashboard-workflow-list";

export default withAuth(Management, "protected");
function Management() {
  return (
    <>
      <TopTitleDesc
        title="관리"
        description="모든 워크플로우와 참여자의 진행도를 모니터링 및 액션을 수행할 수 있습니다."
      >
        <DashBoardWorkflowList />
      </TopTitleDesc>
    </>
  );
}
