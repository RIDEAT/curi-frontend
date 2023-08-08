"use client";

import Image from "next/image";
import { useAtomValue } from "jotai";

import { WorkflowTimeline } from "./components/ui/timeline/components/workflow";
import { timelineDataAtom } from "../../../lib/context/workflow";
import { MainPageLayout } from "../../../components/layouts/main-page-layout";

import workflow_mobile_1 from "../../../public/workflow_mobile_1.png";
import workflow_mobile_2 from "../../../public/workflow_mobile_2.png";
import workflow_mobile_3 from "../../../public/workflow_mobile_3.png";

export default function Workflow() {
  const timelineData = useAtomValue(timelineDataAtom);
  return (
    <>
      <MainPageLayout
        title="신입 공통 워크플로우"
        description="모든 신입사원의 공통 워크플로우입니다."
        bgColor="bg-stone-100"
      >
        <div className="hidden sm:block">
          <WorkflowTimeline timelineData={timelineData} />
        </div>
        <div className="w-screen block sm:hidden font-semibold text-stone-600 p-4">
          <p>모바일 환경에서는 예시 이미지만 확인할 수 있습니다.</p>
          <p>원활한 서비스 체험을 위해 PC로 접속해주세요.</p>
        </div>
        <div className="w-screen block sm:hidden">
          <Image
            alt="Curi Board UI"
            src={workflow_mobile_1}
            width={775}
            height={937}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            quality={100}
          />
          <Image
            alt="Curi Board UI"
            src={workflow_mobile_2}
            width={775}
            height={937}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            quality={100}
          />
          <Image
            alt="Curi Board UI"
            src={workflow_mobile_3}
            width={775}
            height={636}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            quality={100}
          />
        </div>
      </MainPageLayout>
    </>
  );
}
