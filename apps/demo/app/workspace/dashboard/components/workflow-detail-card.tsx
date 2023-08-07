"use client";

import { Card, CardContent, CardHeader, CardTitle } from "ui";
import { cn } from "ui/lib/utils";

import { useAtomValue } from "jotai";
import {
  selectedWorkflowIdAtom,
  workflowDataListAtom,
} from "../../../../lib/context/dashboard";

export function WorkflowDetailCard({ className }: { className?: string }) {
  const selectedWorkflowId = useAtomValue(selectedWorkflowIdAtom);
  const workflowDataList = useAtomValue(workflowDataListAtom);

  return (
    <Card className={cn(className, "overflow-hidden")}>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          {workflowDataList[selectedWorkflowId - 1].name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">detail</CardContent>
    </Card>
  );
}
