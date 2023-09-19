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
import { ChatbotCreateForm } from "./chatbot-create-form";
import { ChatbotBox } from "./chatbot-box";

function ChatbotDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          챗봇
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            챗봇 체험하기
          </DialogTitle>
          <DialogDescription>
            워크플로우 내용 기반으로 답변합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <ChatbotBox setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ChatbotDialog };
