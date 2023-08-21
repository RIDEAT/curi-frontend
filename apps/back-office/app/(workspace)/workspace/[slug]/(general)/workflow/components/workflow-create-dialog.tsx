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

import { WorkflowCreateForm } from "./workflow-create-form";

function WorkflowCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">워크플로우 생성하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>워크플로우 생성</DialogTitle>
          <DialogDescription>
            워크플로우의 이름을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <WorkflowCreateForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { WorkflowCreateDialog };
