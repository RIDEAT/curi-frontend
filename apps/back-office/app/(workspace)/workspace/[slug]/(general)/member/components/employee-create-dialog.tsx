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
import { EmployeeCreateForm } from "./employee-create-form";

function EmployeeCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">추가하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>신규 입사자 추가</DialogTitle>
          <DialogDescription>
            신규 입사자의 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <EmployeeCreateForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { EmployeeCreateDialog };
