"use client";

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
import { useEffect, useState } from "react";
import WorkspaceSettingDialog from "../dialogs/WorkspaceSettingDialog";
import { IWorkspace } from "workspace-types";
import { usePathname, useRouter } from "next/navigation";
import extractSlug from "../../../lib/utils/extractSlug";
import WorkspaceAPI from "../../../lib/api/workspace";

export default function WorkspaceCombo() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace | null>(
    null
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    WorkspaceAPI.getWorkspace().then((result) => {
      setWorkspaces(result);

      const currentSlug = extractSlug(pathname);
      const currentWorkspace = result.find(
        (workspace) => Number(workspace.id) === currentSlug
      );

      setSelectedWorkspace(currentWorkspace);
    });
  }, []);

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
                {selectedWorkspace?.name
                  ? workspaces.find(
                      (workspace) => workspace.name === selectedWorkspace.name
                    )?.name
                  : ""}
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
                  key={workspace.id}
                  onSelect={(currentLabel) => {
                    setSelectedWorkspace((prev) => {
                      if (currentLabel === prev.name) return prev;
                      return workspaces.find(
                        (workspace) => workspace.name === currentLabel
                      );
                    });
                    setOpen(false);
                    router.push(`/workspace/${workspace.id}/dashboard`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedWorkspace.name === workspace.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {workspace.name}
                </CommandItem>
              ))}
              <hr></hr>
              <CommandItem>
                <WorkspaceSettingDialog targetWorkspace={selectedWorkspace} />
              </CommandItem>
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
