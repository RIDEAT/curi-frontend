"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";
import { cn } from "ui/lib/utils";

import { useAtomValue } from "jotai";
import {
  IMemberWorkspace,
  selectedWorkflowIdAtom,
  workflowDataListAtom,
} from "../../../../lib/context/dashboard";
import { getTextColor } from "./util";

export function WorkflowDetailCard({ className }: { className?: string }) {
  const selectedWorkflowId = useAtomValue(selectedWorkflowIdAtom);
  const workflowDataList = useAtomValue(workflowDataListAtom);

  return (
    <Card className={cn(className, "h-full")}>
      <CardHeader>
        <CardTitle className="h-1/5 flex items-center text-xl">
          {workflowDataList[selectedWorkflowId - 1].name}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%] flex items-center gap-3  overflow-x-scroll overflow-y-scroll">
        <div className="h-full overflow-scroll">
          <WorkflowDetailTable
            data={workflowDataList[selectedWorkflowId - 1].members}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const CompletedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="11.9999"
        r="9"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10L11 14L9 12"
        stroke="#22C55E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const InProgressIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.63606 18.364C9.15077 21.8787 14.8493 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8493 2.12132 9.15077 2.12132 5.63606 5.63604C3.87757 7.39453 2.99889 9.69966 3.00002 12.0044L3 14"
        stroke="#FFC800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 12L3 14L5 12"
        stroke="#FFC800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8L11 13L16 13"
        stroke="#FFC800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "inProgress":
      return <InProgressIcon />;
    case "outDate":
      return "🚫";
    case "completed":
      return <CompletedIcon />;
    default:
      return "🔴";
  }
};

function WorkflowDetailTable({ data }: { data: IMemberWorkspace[] }) {
  return (
    <Table className="w-screen overflow-x-scroll overflow-y-scroll">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이름</TableHead>
          <TableHead className="w-[150px] text-center">입사일</TableHead>
          <TableHead className="w-[100px] text-center">상태</TableHead>
          <TableHead className="w-[200px] text-center">진행률</TableHead>
          <TableHead className="w-[100px] text-center">eNPS</TableHead>
          {data[0].sequences.map((sequence) => (
            <TableHead key={sequence.id} className="w-[150px] text-center">
              {sequence.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell className="text-center">{row.startDate}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center">
                {getStatusIcon(row.status)}
              </div>
            </TableCell>
            <TableCell className="flex gap-2">
              <Progress
                value={row.progressRate * 100}
                color="bg-violet-600"
                className="flex-1"
              />
              <div>{Math.floor(row.progressRate * 100)} %</div>
            </TableCell>
            <TableCell
              className={cn(getTextColor(row.eNPS / 100), "text-center")}
            >
              {row.eNPS} %
            </TableCell>
            {row.sequences.map((sequence) => (
              <TableCell key={sequence.id} className="text-center">
                <div className="flex justify-center">
                  {getStatusIcon(sequence.status)}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
