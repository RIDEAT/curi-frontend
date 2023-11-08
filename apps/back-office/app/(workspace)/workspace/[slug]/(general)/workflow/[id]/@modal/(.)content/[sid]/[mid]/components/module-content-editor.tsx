"use client";

import { useRouter } from "next/navigation";
import { useContent } from "../../../../../../../../../../../../lib/hook/swr/useContent";
import { useCallback, useEffect, useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import {
  AlertDialog,
  AlertDialogTrigger,
  Button,
  Dialog,
  ErrorBadge,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  LoadingCircle,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  getModuleContentComponents,
  getModuleIcon,
} from "ui";
import { getModuleContentFormComponent } from "./getModuleContentFormComponent";
import { EditIcon, EyeIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { z } from "zod";
import { moduleNameSchema } from "../../../../../../../../../../../../lib/form-schemas/module";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModuleAPI } from "../../../../../../../../../../../../lib/api/module";
import { useWorkflow } from "../../../../../../../../../../../../lib/hook/swr/useWorkflow";
import { EyeClosedIcon, TrashIcon } from "@radix-ui/react-icons";
import { ModuleDeleteDialog } from "./module-delete-dialog";

const moduleNameUpdateFormSchema = z.object({
  name: moduleNameSchema,
});

type ModuleNameUpdateFormValues = z.infer<typeof moduleNameUpdateFormSchema>;

function ModuleContentEditor({
  params: { slug, id, sid, mid },
}: {
  params: { slug: string; id: string; sid: string; mid: string };
}) {
  const router = useRouter();
  const { content, isLoading, error, contentMutate } = useContent(sid, mid);
  const { workflowMutate } = useWorkflow(id);
  const [open, setOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isSmartPhoneView, setIsSmartPhoneView] = useState(false);

  const form = useForm<ModuleNameUpdateFormValues>({
    resolver: zodResolver(moduleNameUpdateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await ModuleAPI.updateName(slug, id, sid, mid, { name: data.name });
      await contentMutate();
      await workflowMutate();
      setIsEdit(false);
    } catch (e) {
      console.error(e);
    }
    setIsEdit(false);
  };

  const onDismiss = useCallback(
    (openState: boolean) => {
      setOpen(openState);
      router.back();
    },
    [router]
  );

  useEffect(() => {
    if (content) {
      form.setValue("name", content.title);
    }
  }, [content]);

  if (isLoading) {
    return <LoadingCircle />;
  } else if (error) {
    return <ErrorBadge />;
  }

  return (
    <Sheet open={open} onOpenChange={onDismiss}>
      {content && (
        <>
          <SheetContent
            isBlur
            className="flex flex-col w-[500px] min-w-[500px] md:w-[700px] md:min-w-[700px] h-full"
          >
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                <div>{getModuleIcon(content.type) || content.type}</div>
                <div className="text-lg font-semibold">
                  {!isEdit ? (
                    <div
                      onClick={() => setIsEdit(true)}
                      className="flex items-center hover:cursor-pointer"
                    >
                      {content?.title}
                      <EditIcon className="h-4 w-4 ml-2" />
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      hi
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
                          <div className="flex gap-2">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" variant="ghost">
                              <SaveIcon />
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  )}
                </div>
              </SheetTitle>
              <Separator className="mb-4" />
            </SheetHeader>
            <div className="h-full mt-4 px-2 overflow-scroll scrollbar-hide">
              {!isPreview
                ? getModuleContentFormComponent(
                    content.type,
                    content.contents,
                    sid,
                    mid
                  )
                : getModuleContentPreviewComponent(
                    content.contents,
                    content.type,
                    content?.title,
                    isSmartPhoneView,
                    setIsSmartPhoneView
                  )}
            </div>
            <div className="w-full flex justify-between items-end">
              <AlertDialog>
                <AlertDialogTrigger
                  asChild
                  className="w-full flex justify-start"
                >
                  <Button
                    variant="outline"
                    className="m-0 w-fit  flex justify-center h-8 outline-red-500 hover:bg-red-100"
                  >
                    <Trash2Icon className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <ModuleDeleteDialog
                  sequenceId={sid}
                  moduleId={mid}
                  setOpen={onDismiss}
                />
              </AlertDialog>
              <Button
                className="flex gap-2"
                onClick={() => {
                  setIsPreview((prev) => !prev);
                }}
              >
                {isPreview ? (
                  <>
                    <EyeClosedIcon className="h-4 w-4" />
                    <div>미리보기 닫기</div>
                  </>
                ) : (
                  <>
                    <EyeIcon className="h-4 w-4" />
                    <div>미리보기</div>
                  </>
                )}
              </Button>
            </div>
          </SheetContent>
        </>
      )}
    </Sheet>
  );
}

const getModuleContentPreviewComponent = (
  contents,
  type,
  name,
  isSmartPhoneView,
  setIsSmartPhoneView
) => {
  return (
    <div className="h-full flex flex-col gap-2 overflow-scroll scrollbar-hide">
      <div className="flex gap-2 justify-between items-center text-sm font-medium text-stone-500">
        <div>저장된 내용으로 미리보기가 보여집니다</div>
        <Button
          variant="outline"
          onClick={() => {
            setIsSmartPhoneView((prev) => !prev);
          }}
        >
          {isSmartPhoneView ? (
            <div>데스크탑 화면 보기</div>
          ) : (
            <div>스마트폰 화면 보기</div>
          )}
        </Button>
      </div>

      {isSmartPhoneView ? (
        <div className="h-full">
          <DeviceFrameset device="iPhone X" color="gold" zoom={0.8}>
            <ModulePreviewComponent
              contents={contents}
              type={type}
              name={name}
            />
          </DeviceFrameset>
        </div>
      ) : (
        <div className="h-full border border-1">
          <ModulePreviewComponent contents={contents} type={type} name={name} />
        </div>
      )}
    </div>
  );
};

const ModulePreviewComponent = ({ contents, type, name }) => {
  return (
    <div className="h-full p-4 overflow-scroll scrollbar-hide">
      <div className="flex gap-2 justify-between items-center mt-4">
        <div className="flex gap-2 items-center mb-2">
          {getModuleIcon(type)}
          <div className="text-lg font-semibold">{name}</div>
        </div>
      </div>
      {getModuleContentComponents(contents, type)}
    </div>
  );
};

export { ModuleContentEditor };
