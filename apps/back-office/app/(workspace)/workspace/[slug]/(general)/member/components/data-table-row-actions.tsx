"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[50px]">
          <DropdownMenuItem className="hover:cursor-pointer">
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 text-red-500 focus:text-red-500 hover:cursor-pointer">
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-0 m-0 flex justify-start h-8"
                onClick={() => setTargetId(member.id)}
              >
                <div className="ml-2">삭제하기</div>
              </Button>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <MemberDeleteDialog memberId={targetId} />
      </AlertDialog>
    </DropdownMenu>
  );
}
