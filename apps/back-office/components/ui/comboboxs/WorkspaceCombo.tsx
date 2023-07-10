"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "ui/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

const workspaces = [
  {
    value: "rideat",
    label: "RIDEAT",
  },
  {
    value: "curi",
    label: "CURI",
  },
  {
    value: "example",
    label: "example",
  },
];

export default function WorkspaceCombo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("rideat");

  return (
    <div className="w-full justify-start">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex justify-start items-center gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-lg">
                {value
                  ? workspaces.find((workspace) => workspace.value === value)
                      ?.label
                  : "RIDEAT"}
              </div>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandGroup>
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === workspace.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {workspace.label}
                </CommandItem>
              ))}
              <hr></hr>
              <CommandItem>
                <Link
                  href="/create-workspace"
                  className="w-full px-3 flex justify-between items-center"
                >
                  <p>워크스페이스 생성하기</p>
                  <PlusIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Link>
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
