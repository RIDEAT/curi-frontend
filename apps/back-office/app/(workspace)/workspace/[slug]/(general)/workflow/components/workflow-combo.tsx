"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { PlusIcon, ExitIcon } from "@radix-ui/react-icons";
import { WorkflowCreateDialog } from "./workflow-create-dialog";

import { cn } from "ui/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  ErrorBadge,
  LoadingCircle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui";
import { WorkflowImportDialog } from "./workflow-import-dialog";

export default function WorkflowCombo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-start">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
          >
            <div className="flex justify-start items-center gap-2">
              <div className="text-lg">
                <p className="text-sm">워크플로우 생성하기</p>
              </div>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandGroup>
              <CommandItem>
                <WorkflowCreateDialog />
              </CommandItem>
              <hr></hr>
              <CommandItem>
                <WorkflowImportDialog />
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
