"use client";

import withAuth from "../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../components/top-title-desc";

export default withAuth(Management, "protected");
function Management() {
  return (
    <>
      <TopTitleDesc
        title="관리"
        description="모든 워크플로우의 현황과 참여자의 진행도를 모니터링 할 수 있습니다.."
      >
        <div>관리</div>
      </TopTitleDesc>
    </>
  );
}
