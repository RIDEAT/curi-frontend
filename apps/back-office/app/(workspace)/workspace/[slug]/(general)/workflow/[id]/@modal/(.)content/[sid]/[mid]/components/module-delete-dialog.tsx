"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { useCurrentWorkspace } from "../../../../../../../../../../../../lib/hook/useCurrentWorkspace";
import { ModuleAPI } from "../../../../../../../../../../../../lib/api/module";
import { useCurrentWorkflow } from "../../../../../../../../../../../../lib/hook/useCurrentWorkflow";
import { useWorkflow } from "../../../../../../../../../../../../lib/hook/swr/useWorkflow";

export function ModuleDeleteDialog({
  sequenceId,
  moduleId,
  setOpen,
}: {
  sequenceId: string;
  moduleId: string;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflowMutate } = useWorkflow(currentWorkflowId);

  const deleteModule = async () => {
    try {
      const result = await ModuleAPI.deleteOne(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        moduleId
      );
      await workflowMutate();
      pushSuccessToast("모듈 삭제 완료", "모듈을 삭제했습니다.");
    } catch (error) {
      console.error(error);
      pushFailToast("모듈 삭제 실패", "모듈을 삭제하지 못했습니다.");
    }
    setOpen(false);
  };

  const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
      deleteModule();
    }
  };

  return (
    <AlertDialogContent onKeyDown={enterKeyHandler}>
      <AlertDialogHeader>
        <AlertDialogTitle>모듈을 정말 삭제하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          삭제한 모듈은 복구할 수 없습니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction
          onClick={deleteModule}
          className="bg-red-500 hover:bg-red-500"
        >
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
