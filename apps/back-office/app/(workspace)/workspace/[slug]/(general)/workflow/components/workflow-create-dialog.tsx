import { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { WorkflowCreateForm } from "./workflow-create-form";
import { PlusIcon } from "@radix-ui/react-icons";

function WorkflowCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-[300px] shadow-lg flex flex-col justify-between">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="border-0 w-full h-full flex justify-center items-center"
          >
            <PlusIcon className="h-6 w-6 mr-2" />
            <div className="text-xl font-medium">new</div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 워크플로우 생성</DialogTitle>
            <DialogDescription>
              워크플로우의 이름을 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <WorkflowCreateForm setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export { WorkflowCreateDialog };
