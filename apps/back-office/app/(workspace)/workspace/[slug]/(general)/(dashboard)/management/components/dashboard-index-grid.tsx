import { useEffect, useState } from "react";
import { WorkflowNumberCard } from "./workflow-number-card";
import { useDashboardWorkflows } from "../../../../../../../../lib/hook/swr/useDashboardWorkflows";
import {
  CompletedIcon,
  ErrorBadge,
  InProgressIcon,
  LoadingCircle,
  WorkflowIcon,
} from "ui";

function DashboardIndexGrid() {
  const { dashboardWorkflows, isLoading, error } = useDashboardWorkflows();
  const [isPendingNum, setIsPendingNum] = useState(0);
  const [isProgressNum, setIsProgressNum] = useState(0);
  const [isCompleteNum, setIsCompleteNum] = useState(0);

  useEffect(() => {
    if (dashboardWorkflows) {
      let pendingNum = 0;
      dashboardWorkflows.forEach((workflow) => {
        pendingNum += workflow.pendingCnt;
      });
      setIsPendingNum(pendingNum);

      let progressNum = 0;
      dashboardWorkflows.forEach((workflow) => {
        progressNum += workflow.inProgressCnt;
      });
      setIsProgressNum(progressNum);

      let completeNum = 0;
      dashboardWorkflows.forEach((workflow) => {
        completeNum += workflow.completedCnt;
      });
      setIsCompleteNum(completeNum);
    }
  }, [dashboardWorkflows]);

  if (isLoading) {
    <LoadingCircle />;
  } else if (error) {
    <ErrorBadge />;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <WorkflowNumberCard
        icon={<WorkflowIcon />}
        title="대기 중 워크플로우"
        numCard={isPendingNum || 0}
      />
      <WorkflowNumberCard
        icon={<InProgressIcon />}
        title="실행 중 워크플로우"
        numCard={isProgressNum || 0}
        color="text-yellow-500"
      />
      <WorkflowNumberCard
        icon={<CompletedIcon />}
        title="완료된 워크플로우"
        numCard={isCompleteNum || 0}
        color="text-green-500"
      />
    </div>
  );
}

export { DashboardIndexGrid };
