import { useEffect, useState } from "react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

import {
  Separator,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

import Editor from "../../editor";
import {
  ModuleType,
  getModuleIcon,
} from "../../../../../../../components/icons/module-icons";

export interface IModuleData {
  id: string;
  type: ModuleType;
  title: string;
  content: any;
}

function TextModule({
  content,
  setContent,
}: {
  content: any;
  setContent: any;
}) {
  return <Editor content={content} setContent={setContent} />;
}

function ModuleContent({ module }: { module: IModuleData }) {
  const [content, setContent] = useState({ type: "doc", content: [] });

  useEffect(() => {
    setContent({ type: "doc", content: module.content });
  }, [module]);

  return (
    <SheetContent
      isBlur={true}
      className="w-[800px] sm:w-[800px] sm:max-w-none"
    >
      <SheetHeader>
        <SheetTitle>{module.title}</SheetTitle>
        <SheetDescription>
          아래 에디터에서 모듈을 편집할 수 있습니다.
        </SheetDescription>
      </SheetHeader>
      <Separator className="my-4" />
      <TextModule content={content} setContent={setContent} />
    </SheetContent>
  );
}

function ModuleBox({ type, title }: { type: ModuleType; title: string }) {
  return (
    <SheetTrigger asChild>
      <div className="flex justify-between items-center w-full h-11  rounded-sm text-md font-medium bg-stone-100 p-2 shadow-sm border border-stone-200">
        <div className="flex gap-3 items-center">
          {getModuleIcon(type)}
          <div className="text-md">{title}</div>
        </div>
        <div>
          <DragHandleDots2Icon />
        </div>
      </div>
    </SheetTrigger>
  );
}
export { ModuleBox, ModuleContent };
