"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { SequenceCreateForm } from "./sequence-create-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { ModuleCreateForm } from "./module-create-form";
import { IModule } from "workflow-types";

function ModuleCreateDialog({
  lastOrder,
  sequenceId,
  setModuleItems,
}: {
  lastOrder: number;
  sequenceId: string;
  setModuleItems: (modules: IModule[]) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-2 w-full h-10 border-2 border-dotted"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          <p>New</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            모듈 생성하기
          </DialogTitle>
          <DialogDescription>모듈의 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <ModuleCreateForm
            sequenceId={sequenceId}
            setOpen={setOpen}
            setModuleItems={setModuleItems}
            targetOrder={lastOrder}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ModuleCreateDialog };
