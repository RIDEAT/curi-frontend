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

export function WorkflowTracker({ className }: { className?: string }) {
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
const workflowData = [
  {
    name: "신입 사원 공통 온보딩",
    waiting: 2,
    inProgress: 3,
    completed: 7,
  },
  {
    name: "경력 사원 공통 온보딩",
    waiting: 0,
    inProgress: 2,
    completed: 6,
  },
  {
    name: "육아 휴직 사원 리보딩",
    waiting: 2,
    inProgress: 3,
    completed: 1,
  },
  {
    name: "정기 안전 교육",
    waiting: 30,
    inProgress: 0,
    completed: 0,
  },
  {
    name: "주니어 백엔드 개발자 교육",
    waiting: 0,
    inProgress: 1,
    completed: 8,
  },
];

function WorkflowTrackerTable() {
  return (
    <>
      <div className="h-full overflow-y-scroll scrollbar grid grid-cols-6 gap-y-3 gap-x-1 pr-4">
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
        {workflowData.map((workflow) => (
          <WorkflowTrackerTableDataRow
            key={workflow.name}
            name={workflow.name}
            waiting={workflow.waiting}
            inProgress={workflow.inProgress}
            completed={workflow.completed}
          />
        ))}
        <div className="col-span-5 h-3"></div>
      </div>
    </>
  );
}

const getBgColor = (rate: number) => {
  if (rate < 0.1) {
    return "bg-violet-100 ";
  } else if (rate < 0.3) {
    return "bg-violet-200";
  } else if (rate < 0.5) {
    return "bg-violet-300 text-white";
  } else if (rate < 0.7) {
    return "bg-violet-400 text-white";
  } else if (rate < 0.9) {
    return "bg-violet-500 text-white";
  } else {
    return "bg-violet-700 text-white";
  }
};

const getTextColor = (rate: number) => {
  if (rate < 0.1) {
    return "text-stone-400";
  } else if (rate < 0.3) {
    return "text-violet-300";
  } else if (rate < 0.5) {
    return "text-violet-400";
  } else if (rate < 0.7) {
    return "text-violet-500";
  } else if (rate < 0.9) {
    return "text-violet-600";
  } else {
    return "text-violet-700";
  }
};

function WorkflowTrackerTableDataRow({
  name,
  waiting,
  inProgress,
  completed,
}: {
  name: string;
  waiting: number;
  inProgress: number;
  completed: number;
}) {
  const total = waiting + inProgress + completed;
  return (
    <>
      <div className="col-span-2 flex justify-start items-center font-medium ">
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
        {(completed / total).toFixed(2).toString().slice(2, 4) + " %"}
      </div>
    </>
  );
}
