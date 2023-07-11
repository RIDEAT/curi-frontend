import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { GearIcon } from "@radix-ui/react-icons";
import { UpdateWorkspaceForm } from "../forms/UpdateWorkspaceForm";
import { IWorkspace } from "workspace-types";
import { useState } from "react";

export function WorkspaceSettingDialog({
  targetWorkspace,
}: {
  targetWorkspace: IWorkspace;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full px-3 flex justify-between items-center">
          <p>설정</p>
          <GearIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>워크스페이스 설정</DialogTitle>
          <DialogDescription>
            워크스페이스의 기본정보를 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <UpdateWorkspaceForm
          targetWorkspace={targetWorkspace}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
