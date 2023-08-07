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
      <CardContent className="w-full h-4/5 flex items-center gap-3  overflow-x-scroll overflow-y-scroll">
        <div className="h-full overflow-scroll">
          <WorkflowDetailTable
            data={workflowDataList[selectedWorkflowId - 1].members}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "inProgress":
      return "🟡";
    case "outDate":
      return "🚫";
    case "completed":
      return "✅";
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
              {getStatusIcon(row.status)}
            </TableCell>
            <TableCell className="flex gap-2">
              <Progress
                value={row.progressRate * 100}
                color="bg-violet-600"
                className="flex-1"
              />
              <div>{row.progressRate * 100} %</div>
            </TableCell>
            <TableCell
              className={cn(getTextColor(row.eNPS / 100), "text-center")}
            >
              {row.eNPS} %
            </TableCell>
            {row.sequences.map((sequence) => (
              <TableCell key={sequence.id} className="text-center">
                {getStatusIcon(sequence.status)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
