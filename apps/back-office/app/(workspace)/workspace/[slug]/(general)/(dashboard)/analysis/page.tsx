"use client";

import withAuth from "../../../../../../../components/hoc/withAuth";
import { TopTitleDesc } from "../../components/top-title-desc";

export default withAuth(Analysis, "protected");
function Analysis() {
  return (
    <>
      <TopTitleDesc
        title="분석"
        description="모든 워크플로우의 현황과 참여자의 진행도를 모니터링 할 수 있습니다."
      >
        <div className="w-full h-full flex justify-center items-center gap-4">
          <div>
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
            </span>
          </div>
          <div className="text-2xl text-yellow-500 font-semibold">
            Comming Soon!
          </div>
        </div>
      </TopTitleDesc>
    </>
  );
}
