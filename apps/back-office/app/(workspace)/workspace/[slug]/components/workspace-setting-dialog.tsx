import { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { IWorkspace } from "workspace-types";
import { UpdateWorkspaceForm } from "../../../../../components/workspace/form/UpdateWorkspaceForm";
import { useRouter } from "next/navigation";

export function WorkspaceSettingButton({
  targetWorkspace,
  setOpen,
}: {
  targetWorkspace: IWorkspace;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const redirectSettingTab = () => {
    router.push(`/workspace/${targetWorkspace.id}/setting`);
    setOpen(false);
  };

  return (
    <div
      className="w-full px-3 flex justify-between items-center"
      onClick={redirectSettingTab}
    >
      <p>설정</p>
      <GearIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </div>
  );
}
