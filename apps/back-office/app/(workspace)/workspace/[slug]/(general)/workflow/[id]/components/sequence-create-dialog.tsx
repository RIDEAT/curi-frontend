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

function SequenceCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">시퀀스 생성하기</Button>
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
