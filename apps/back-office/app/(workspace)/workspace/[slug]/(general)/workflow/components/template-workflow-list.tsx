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
import { ImportIcon } from "lucide-react";

function TemplateWorkflowList({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [isRequesting, setIsRequesting] = useState(false);
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { workflowsMutate } = useWorkflows();
  const { templateWorkflows, isLoading, error, mutateTemplateWorkflows } =
    useTemplateWorkflows();

  const importHandler = async (e) => {
    try {
      setIsRequesting(true);
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
      setIsRequesting(false);
    } catch (error) {
      pushFailToast("워크플로우 가져오기 실패", "다시 시도해주세요.");
      setOpen(false);
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    <LoadingCircle />;
  } else if (error) {
    <ErrorBadge />;
  }

  if (isRequesting) {
    return (
      <div className="w-full h-full justify-center items-center">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px] min-w-[250px]">워크플로우</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium">
        {!isRequesting && templateWorkflows?.length ? (
          templateWorkflows?.map((workflow) => (
            <TableRow
              key={workflow.id}
              id={workflow.id}
              className="hover:bg-inherit"
            >
              <TableCell>{workflow.name}</TableCell>
              <TableCell className="flex justify-end">
                <Button onClick={importHandler}>
                  <ImportIcon className="w-5 h-5" />
                </Button>
              </TableCell>
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
