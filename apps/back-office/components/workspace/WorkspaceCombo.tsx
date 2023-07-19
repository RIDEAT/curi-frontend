"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons";

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

import { IWorkspace } from "workspace-types";
import extractSlug from "../../lib/utils/extractSlug";
import { useWorkspace } from "../../lib/hook/swr/useWorkspace";
import { WorkspaceSettingDialog } from "./WorkspaceSettingDialog";

export default function WorkspaceCombo() {
  const [open, setOpen] = useState(false);
  const { workspaces, isLoading, error } = useWorkspace();
  const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const currentSlug = extractSlug(pathname);
      const currentWorkspace = workspaces?.find(
        (workspace) => Number(workspace.id) === currentSlug
      );

      setSelectedWorkspace(currentWorkspace);
    }
  }, [workspaces]);

  if (isLoading) return <div>loading..</div>;
  if (error) return <div>error</div>;

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
              <CurrentWorkspaceLabel selectedWorkspace={selectedWorkspace} />
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandGroup>
              <CommandItems
                selectedWorkspace={selectedWorkspace}
                setSelectedWorkspace={setSelectedWorkspace}
                setOpen={setOpen}
              />
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

function CurrentWorkspaceLabel({ selectedWorkspace }) {
  const { workspaces, isLoading, error } = useWorkspace();

  if (isLoading) return <div>loading..</div>;
  if (error) return <div>error</div>;

  return (
    <div className="text-lg">
      {selectedWorkspace?.name
        ? workspaces.find(
            (workspace) => workspace.name === selectedWorkspace.name
          )?.name
        : ""}
    </div>
  );
}

function CommandItems({ selectedWorkspace, setSelectedWorkspace, setOpen }) {
  const { workspaces, isLoading, error } = useWorkspace();
  const router = useRouter();

  if (isLoading) return <div>loading..</div>;
  if (error) return <div>error</div>;

  return (
    <>
      {workspaces?.map((workspace) => (
        <CommandItem
          key={workspace.id}
          onSelect={(currentLabel) => {
            setSelectedWorkspace((prev) => {
              if (currentLabel === prev.name) return prev;
              return workspaces?.find(
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
    </>
  );
}
