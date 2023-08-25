"use client";

import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { AlertDialog, AlertDialogTrigger, Button } from "ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

import { employeeSchema } from "./employee-schema";
import { MemberType } from "member-types";
import { managerSchema } from "./manager-schema";
import { MemberDeleteDialog } from "./member-delete-dialog";
import { useState } from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  type: MemberType;
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  type,
  row,
}: DataTableRowActionsProps<TData>) {
  const member =
    type == "employee"
      ? employeeSchema.parse(row.original)
      : managerSchema.parse(row.original);

  const [targetId, setTargetId] = useState("");

  return (
    <AlertDialog>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="m-0 flex justify-start h-8 hover:bg-stone-200"
        >
          <Edit2Icon className="h-4 w-4 text-stone-700 " />
        </Button>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="m-0 flex justify-start h-8 hover:bg-red-100"
            onClick={() => setTargetId(member.id)}
          >
            <Trash2Icon className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>

        <MemberDeleteDialog memberId={targetId} />
      </div>
    </AlertDialog>
  );
}
