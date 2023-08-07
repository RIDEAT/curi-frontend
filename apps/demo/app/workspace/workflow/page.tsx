"use client";

import { Separator } from "ui";
import { WorkflowTimeline } from "./components/ui/timeline/components/workflow";
import { useAtomValue } from "jotai";
import { timelineDataAtom } from "../../../lib/context/workflow";
import { MainPageLayout } from "../../../components/layouts/main-page-layout";

export default function Workflow() {
  const timelineData = useAtomValue(timelineDataAtom);
  return (
    <>
      <MainPageLayout
        title="신입 공통 워크플로우"
        description="모든 신입사원의 공통 워크플로우입니다."
        bgColor="bg-stone-100"
      >
        <WorkflowTimeline timelineData={timelineData} />
      </MainPageLayout>
    </>
  );
}
