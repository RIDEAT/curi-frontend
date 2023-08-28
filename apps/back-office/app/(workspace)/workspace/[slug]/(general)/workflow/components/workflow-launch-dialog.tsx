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

function WorkflowLaunchDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-violet-500 hover:bg-violet-600">
          실행하기
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px] max-w-[700px] w-[700px]">
        <DialogHeader>
          <DialogTitle>워크플로우 실행</DialogTitle>
          <DialogDescription>
            워크플로우를 실행하여, 신규 입사자의 온보딩을 시작합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6"></div>
      </DialogContent>
    </Dialog>
  );
}

export { WorkflowLaunchDialog };
