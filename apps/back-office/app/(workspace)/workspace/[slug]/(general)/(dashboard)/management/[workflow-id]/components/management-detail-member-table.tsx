"use client";

import { ArrowRightIcon } from "lucide-react";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ErrorBadge,
  LoadingCircle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  getStatusIcon,
} from "ui";
import { useDashboardWorkflowMembers } from "../../../../../../../../../lib/hook/swr/useDashboardWorkflowMembers";
import { useEffect, useState } from "react";
import { CollapsibleDetailInfoRow } from "./collapsible-detail-info-row";

function ManagementDetailMemberTable({ workflowId }: { workflowId: string }) {
  const { dashboardWorkflowMembers, isLoading, error } =
    useDashboardWorkflowMembers(workflowId);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    if (dashboardWorkflowMembers) {
      setMembers(dashboardWorkflowMembers?.dashboardMembers || []);
    }
  }, [dashboardWorkflowMembers]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] min-w-[150px]">대상자</TableHead>
          <TableHead className="w-[150px] min-w-[150px]">D-day</TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <div>상태</div>
            </div>
          </TableHead>
          <TableHead>진행률</TableHead>
          <TableHead>시퀀스</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium">
        {members?.length ? (
          members.map((member) => {
            const launchedWorkflowInfo = member?.launchedWorkflowResponse;
            const launchedWorkflowId = launchedWorkflowInfo?.id;

            const employee = launchedWorkflowInfo?.employee;
            const keyDate = launchedWorkflowInfo?.keyDate;
            const status = launchedWorkflowInfo?.status;
            const workflowProgress = member?.progress;
            const launchedSequences = launchedWorkflowInfo?.launchedSequences;

            return (
              <CollapsibleDetailInfoRow
                key={launchedWorkflowId}
                employee={employee}
                keyDate={keyDate}
                status={status}
                workflowProgress={workflowProgress}
                launchedSequences={launchedSequences}
                launchedWorkflowId={launchedWorkflowId}
              />
            );
          })
        ) : (
          <TableRow>
            <TableCell>워크플로우가 없습니다.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { ManagementDetailMemberTable };
