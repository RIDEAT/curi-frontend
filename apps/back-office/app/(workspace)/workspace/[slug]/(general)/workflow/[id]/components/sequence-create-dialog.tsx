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

function SequenceCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            시퀀스 생성하기
          </DialogTitle>
          <DialogDescription>시퀀스의 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <SequenceCreateForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { SequenceCreateDialog };
