"use client";

import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { IEmployee, IManager, IMember, MemberType } from "member-types";
import { UpdateEmployeeForm } from "../../forms/UpdateEmployeeForm";
import { UpdateManagerForm } from "../../forms/UpdateManagerForm";
import { MemberAPI } from "../../../../lib/api/member";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  type: MemberType;
}

export function DataTableRowActions<TData>({
  row,
  type,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const rowOriginal = useRef(row.original as IEmployee | IManager);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[250px]">
        <Sheet onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setOpen(true);
              }}
            >
              수정
            </DropdownMenuItem>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>멤버 수정하기</SheetTitle>
              <SheetDescription>
                멤버의 정보를 수정할 수 있습니다.
              </SheetDescription>
            </SheetHeader>
            {type == "employee" ? (
              <UpdateEmployeeForm
                employee={row.original as IEmployee}
                setOpen={setOpen}
              />
            ) : (
              <UpdateManagerForm
                manager={row.original as IManager}
                setOpen={setOpen}
              />
            )}
          </SheetContent>
        </Sheet>
        <DropdownMenuSeparator />
        <AlertDialog onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="flex justify-between text-destructive"
              onSelect={(event) => {
                event.preventDefault();
                setOpen(true);
              }}
            >
              삭제
              <TrashIcon />
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <DeleteActionContent
            memberId={rowOriginal.current.id.toString()}
            setOpen={setOpen}
          />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteActionContent({
  memberId,
  setOpen,
}: {
  memberId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const actionHandler = async () => {
    const result = await MemberAPI.delete(memberId);
    console.log(result);
    setOpen(false);
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>정말 멤버를 삭제하겠습니까?</AlertDialogTitle>
        <AlertDialogDescription>
          삭제된 멤버는 서버에서 삭제되어 복구가 불가능합니다. 그리고 진행중인
          모든 워크플로우에서 멤버가 제거됩니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel
          onClick={() => {
            setOpen(false);
          }}
        >
          취소
        </AlertDialogCancel>
        <AlertDialogAction className="bg-destructive" onClick={actionHandler}>
          삭제
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
