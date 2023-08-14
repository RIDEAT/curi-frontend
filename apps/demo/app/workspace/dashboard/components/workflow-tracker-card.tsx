"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "ui";
import { cn } from "ui/lib/utils";
import { getBgColor, getTextColor } from "./util";
import { useAtomValue, useSetAtom } from "jotai";
import {
  selectedWorkflowIdAtom,
  workflowDataListAtom,
} from "../../../../lib/context/dashboard";

export function WorkflowTrackerCard({ className }: { className?: string }) {
  return (
    <>
      <Card className={cn(className, "overflow-hidden")}>
        <CardHeader>
          <CardTitle>워크플로우</CardTitle>
          <CardDescription>
            각 진행 상태를 완수한 인원 수를 확인합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-3/4">
          <WorkflowTrackerTable />
        </CardContent>
      </Card>
    </>
  );
}

const headerColumns = ["워크플로우명", "대기 중", "참여 중", "완료", "진행률"];

function WorkflowTrackerTable() {
  const workflowData = useAtomValue(workflowDataListAtom);
  const selectedWorkflowId = useAtomValue(selectedWorkflowIdAtom);

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <div className="grid grid-cols-6 gap-y-3 gap-x-1 pr-4">
        {headerColumns.map((column, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center text-stone-500 font-semibold text-sm",
              column == "워크플로우명"
                ? "col-span-2 justify-start"
                : "justify-center"
            )}
          >
            {column}
          </div>
        ))}
        <Separator className="col-span-6" />
      </div>
      {workflowData.map((workflow) => (
        <WorkflowTrackerTableDataRow
          id={workflow.id}
          key={workflow.id}
          name={workflow.name}
          waiting={workflow.waiting}
          inProgress={workflow.inProgress}
          completed={workflow.completed}
          selected={workflow.id == selectedWorkflowId}
        />
      ))}
      <div className="col-span-5 h-3"></div>
    </div>
  );
}

function WorkflowTrackerTableDataRow({
  id,
  name,
  waiting,
  inProgress,
  completed,
  selected,
}: {
  id: number;
  name: string;
  waiting: number;
  inProgress: number;
  completed: number;
  selected?: boolean;
}) {
  const setSelectedWorkflowId = useSetAtom(selectedWorkflowIdAtom);
  const total = waiting + inProgress + completed;

  return (
    <div
      className={cn(
        "grid grid-cols-6 gap-y-3 gap-x-1 p-2 cursor-pointer hover:bg-stone-100",
        selected && "bg-stone-200"
      )}
      onClick={() => setSelectedWorkflowId(id)}
    >
      <div className="col-span-2 flex justify-start items-center font-semibold text-sm">
        {name}
      </div>
      <div
        className={cn(
          getBgColor(waiting / total),
          " p-1 rounded-l-3xl flex justify-center items-center"
        )}
      >
        {waiting}
      </div>
      <div
        className={cn(
          getBgColor(inProgress / total),
          " p-1 flex justify-center items-center"
        )}
      >
        {inProgress}
      </div>
      <div
        className={cn(
          getBgColor(completed / total),
          " p-1 rounded-r-3xl flex justify-center items-center"
        )}
      >
        {completed}
      </div>

      <div
        className={cn(
          getTextColor(completed / total),
          "p-1 flex justify-center items-center font-semibold"
        )}
      >
        {Math.round((completed / total) * 100)}%
      </div>
    </div>
  );
}
