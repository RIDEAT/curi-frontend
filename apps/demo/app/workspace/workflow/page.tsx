"use client";

import { Separator } from "ui";
import { WorkflowTimeline } from "./components/ui/timeline/components/workflow";
import { useAtomValue } from "jotai";
import { timelineDataAtom } from "../../../lib/context/workflow";

export default function Workflow() {
  const timelineData = useAtomValue(timelineDataAtom);
  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l bg-stone-100 scrollbar-hide">
        <div className=" px-4 py-6 pb-0 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                {"신입 공통 워크플로우"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {"모든 신입사원의 공통 워크플로우입니다."}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </div>
        <WorkflowTimeline timelineData={timelineData} />
      </div>
    </>
  );
}
