import {
  Button,
  CompletedIcon,
  ErrorBadge,
  InProgressIcon,
  LoadingCircle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";
import { useDashboardWorkflows } from "../../../../../../../../lib/hook/swr/useDashboardWorkflows";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function DashboardWorkflowTable() {
  const { dashboardWorkflows, isLoading, error } = useDashboardWorkflows();

  if (isLoading) {
    <LoadingCircle />;
  } else if (error) {
    <ErrorBadge />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px] min-w-[250px]">워크플로우</TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <InProgressIcon />
              <div>진행중</div>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <CompletedIcon />
              <div>완료</div>
            </div>
          </TableHead>
          <TableHead>진행률</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium">
        {dashboardWorkflows?.length ? (
          dashboardWorkflows?.map((workflow) => (
            <TableRow key={workflow.id}>
              <TableCell className="font-medium">{workflow.name}</TableCell>
              <TableCell>{workflow.inProgressCnt}</TableCell>
              <TableCell>{workflow.completedCnt}</TableCell>
              <TableCell>{workflow.progress}</TableCell>
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

export { DashboardWorkflowTable };
