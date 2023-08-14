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
import { NotificationModule } from "./modules/notification-module";
import { FormModule } from "./modules/form-module";
import dynamic from "next/dynamic";
const EditorTour = dynamic(
  () => import("../../../../../../../components/tours/editor-tour"),
  {
    ssr: false,
  }
);

export interface IModuleData {
  id: string;
  type: ModuleType;
  title: string;
  contents: any;
}

const getModuleComponentByType = (type: ModuleType) => {
  switch (type) {
    case "text":
      return TextModule;
    case "notification":
      return NotificationModule;
    case "form":
      return FormModule;
    default:
      return TextModule;
  }
};

function ModuleContent({ module }: { module: IModuleData }) {
  const [content, setContent] = useState({ type: "doc", content: [] });
  const [togglePreview, setTogglePreview] = useState(false);

  const toggleHandler = () => {
    setTogglePreview((prev) => !prev);
  };

  useEffect(() => {
    module.contents.content.push({
      type: "paragraph",
    });
    setContent({ type: "doc", content: [module.contents] });
  }, [module]);

  return (
    <SheetContent
      isBlur={true}
      className="w-[800px] h-screen sm:w-[800px] sm:max-w-none overflow-scroll scrollbar-hide "
    >
      <EditorTour />
      <SheetHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <SheetTitle className="text-xl font-semibold">
            {module.title}
          </SheetTitle>
          <SheetDescription>
            아래 에디터에서 모듈을 편집할 수 있습니다.
          </SheetDescription>
        </div>
        <div className="mr-5">
          <Button
            variant="outline"
            className="flex flex-row gap-2 tour-editor-preview"
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
      <div className="tour-editor-ai">
        {getModuleComponentByType(module.type)({
          content,
          setContent,
          togglePreview,
        })}
      </div>
    </SheetContent>
  );
}

function ModuleBox({ type, title }: { type: ModuleType; title: string }) {
  return (
    <SheetTrigger asChild>
      <div className="flex justify-between items-center w-full h-11  rounded-sm text-sm font-medium bg-stone-100 p-2 shadow-sm border border-stone-200 tour-workflow-module">
        <div className="flex gap-3 items-center">
          {getModuleIcon(type)}
          <div className="text-md font-semibold">{title}</div>
        </div>
        <div>
          <DragHandleDots2Icon />
        </div>
      </div>
    </SheetTrigger>
  );
}
export { ModuleBox, ModuleContent };
