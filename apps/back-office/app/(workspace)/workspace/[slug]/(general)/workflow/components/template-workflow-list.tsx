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
  WorkflowIcon,
  pushSuccessToast,
  pushFailToast,
} from "ui";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useTemplateWorkflows } from "../../../../../../../lib/hook/swr/useTemplateWorkflows";
import { TemplateWorkflowAPI } from "../../../../../../../lib/api/templateWorkflow";
import { useCurrentWorkflow } from "../../../../../../../lib/hook/useCurrentWorkflow";
import { useWorkflows } from "../../../../../../../lib/hook/swr/useWorkflows";
import { useState } from "react";

function TemplateWorkflowList({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const [requesting, setRequesting] = useState(false);
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { workflowsMutate } = useWorkflows();
  const { templateWorkflows, isLoading, error, mutateTemplateWorkflows } =
    useTemplateWorkflows();

  const importHandler = async (e) => {
    try {
      setRequesting(true);
      const templateWorkflwoId = e.currentTarget.id;
      await TemplateWorkflowAPI.importTemplateWorkflow(
        currentWorkspaceId,
        templateWorkflwoId
      );
      await workflowsMutate();
      pushSuccessToast(
        "워크플로우 가져오기 성공",
        "워크플로우를 설계해보세요."
      );
      setOpen(false);
      setRequesting(false);
    } catch (error) {
      pushFailToast("워크플로우 가져오기 실패", "다시 시도해주세요.");
      setOpen(false);
      setRequesting(false);
    }
  };

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
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium">
        {templateWorkflows?.length ? (
          templateWorkflows?.map((workflow) => (
            <TableRow
              key={workflow.id}
              id={workflow.id}
              onClick={importHandler}
              className="cursor-pointer"
            >
              <TableCell>{workflow.name}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>템플릿 워크플로우가 없습니다.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { TemplateWorkflowList };
