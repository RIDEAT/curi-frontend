"use client";

import withAuth from "../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../components/top-title-desc";
import { AlertsButton } from "./components/alerts-button";
import { Satisfactions } from "./components/satisfaction";

export default withAuth(Analysis, "protected");
function Analysis() {
  return (
    <>
      <TopTitleDesc
        title="분석"
        description="모든 워크플로우의 현황과 참여자의 진행도를 모니터링 할 수 있습니다."
      >
        <div>
          <AlertsButton />
          <Satisfactions />
        </div>
      </TopTitleDesc>
    </>
  );
}
