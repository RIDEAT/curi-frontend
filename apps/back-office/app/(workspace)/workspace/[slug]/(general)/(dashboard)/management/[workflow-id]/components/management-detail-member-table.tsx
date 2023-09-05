"use client";

import { ArrowRightIcon } from "lucide-react";
import {
  Button,
  ErrorBadge,
  LoadingCircle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";
import { useDashboardWorkflowMembers } from "../../../../../../../../../lib/hook/swr/useDashboardWorkflowMembers";
import { useEffect, useState } from "react";

function ManagementDetailMemberTable({ workflowId }: { workflowId: string }) {
  const { dashboardWorkflowMembers, isLoading, error } =
    useDashboardWorkflowMembers(workflowId);
  const [members, setMembers] = useState<any[]>([]);

  console.log(members);

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
          <TableHead className="w-[250px] min-w-[250px]">워크플로우</TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <div>대기중</div>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <div>진행중</div>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <div>완료</div>
            </div>
          </TableHead>
          <TableHead>진행률</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium">
        {members?.length ? (
          members.map((member) => (
            <TableRow key={member.id} id={member.id} className="cursor-pointer">
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.pendingCnt}</TableCell>
              <TableCell>{member.inProgressCnt}</TableCell>
              <TableCell>{member.completedCnt}</TableCell>
              <TableCell>{member.progress} %</TableCell>
              <TableCell>
                <Button variant="ghost">
                  <ArrowRightIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
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
