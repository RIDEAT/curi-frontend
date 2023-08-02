import { useEffect, useState } from "react";
import {
  DragHandleDots2Icon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

import {
  Button,
  Separator,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "ui";

import {
  ModuleType,
  getModuleIcon,
} from "../../../../../../../components/icons/module-icons";
import { TextModule } from "./modules/text-module";

export interface IModuleData {
  id: string;
  type: ModuleType;
  title: string;
  content: any;
}

function ModuleContent({ module }: { module: IModuleData }) {
  const [content, setContent] = useState({ type: "doc", content: [] });
  const [togglePreview, setTogglePreview] = useState(false);

  const toggleHandler = () => {
    setTogglePreview((prev) => !prev);
  };

  useEffect(() => {
    setContent({ type: "doc", content: module.content });
  }, [module]);

  return (
    <SheetContent
      isBlur={true}
      className="w-[800px] h-screen sm:w-[800px] sm:max-w-none overflow-scroll scrollbar-hide"
    >
      <SheetHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <SheetTitle className=" text-xl">{module.title}</SheetTitle>
          <SheetDescription>
            아래 에디터에서 모듈을 편집할 수 있습니다.
          </SheetDescription>
        </div>
        <div className="mr-5">
          <Button
            variant="outline"
            className="flex flex-row gap-2"
            onClick={toggleHandler}
          >
            {togglePreview ? (
              <>
                <EyeClosedIcon />
                <div>편집하기</div>
              </>
            ) : (
              <>
                <EyeOpenIcon />
                <div>미리보기</div>
              </>
            )}
          </Button>
        </div>
      </SheetHeader>
      <Separator className="my-4" />
      <TextModule
        content={content}
        setContent={setContent}
        togglePreview={togglePreview}
      />
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
