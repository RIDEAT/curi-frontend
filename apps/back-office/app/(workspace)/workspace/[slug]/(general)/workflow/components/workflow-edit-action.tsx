import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui";
import { WorkflowEditForm } from "./workflow-edit-form";

function WorkflowEditAction({
  workflowId,
  title,
}: {
  workflowId: string;
  title: string;
}) {
  const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onSelect={() => setIsOpen(true)}
          >
            수정하기
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600 hover:cursor-pointer hover:text-red-700"
          >
            삭제하기
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>워크플로우 수정</DialogTitle>
            <DialogDescription>
              워크플로우의 기본 정보를 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <WorkflowEditForm
              workflowId={workflowId}
              currentWorkflowName={title}
              setIsOpen={setIsOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              정말로 워크플로우를 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              삭제한 워크플로우는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { WorkflowEditAction };
