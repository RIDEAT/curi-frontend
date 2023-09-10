import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { Trash2Icon } from "lucide-react";
import { SequenceAPI } from "../../../../../../../../lib/api/sequence";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";

function SequenceDeleteDialog({
  workflowId,
  sequenceId,
}: {
  workflowId: string;
  sequenceId: string;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { workflowMutate } = useWorkflow(workflowId);
  const deleteSequence = async () => {
    try {
      const { response, result } = await SequenceAPI.delete(
        currentWorkspaceId,
        workflowId,
        sequenceId
      );
      await workflowMutate();
      pushSuccessToast("시퀀스 삭제 완료", "시퀀스를 삭제했습니다.");
    } catch (error) {
      pushFailToast("시퀀스 삭제 실패", "시퀀스를 삭제하지 못했습니다.");
    }
  };

  const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
      deleteSequence();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="m-0 flex justify-start h-8 hover:bg-red-100"
        >
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent onKeyDown={enterKeyHandler}>
        <AlertDialogHeader>
          <AlertDialogTitle>시퀀스를 정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 시퀀스는 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteSequence}
            className="bg-red-500 hover:bg-red-500"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { SequenceDeleteDialog };
