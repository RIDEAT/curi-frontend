import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { MemberType } from "member-types";
import { CreateEmployeeForm } from "./form/CreateEmployeeForm";
import { CreateManagerForm } from "./form/CreateManagerForm";

export function MemberCreateDialog({ type }: { type: MemberType }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <PlusCircledIcon />
          <p>추가하기</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">멤버 추가하기</DialogTitle>
          <DialogDescription className="text-sm">
            새로운 멤버를 추가할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        {type == "employee" ? (
          <CreateEmployeeForm setOpen={setOpen} />
        ) : (
          <CreateManagerForm setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
