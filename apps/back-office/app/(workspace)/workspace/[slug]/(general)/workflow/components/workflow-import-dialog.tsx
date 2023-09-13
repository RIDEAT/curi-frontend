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
import { TemplateWorkflowList } from "./template-workflow-list";

function WorkflowImportDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">워크플로우 템플릿 가져오기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>워크플로우 템플릿 가져오기</DialogTitle>
          <DialogDescription>
            워크플로우 템플릿을 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <TemplateWorkflowList setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { WorkflowImportDialog };
