"use client";

import { useRouter } from "next/navigation";
import { useContent } from "../../../../../../../../../../../../lib/hook/swr/useContent";
import { useCallback, useEffect, useState } from "react";
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
  getModuleIcon,
} from "ui";
import { getModuleContentFormComponent } from "./getModuleContentFormComponent";
import { SaveIcon, Trash2Icon } from "lucide-react";
import { z } from "zod";
import { moduleNameSchema } from "../../../../../../../../../../../../lib/form-schemas/module";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModuleAPI } from "../../../../../../../../../../../../lib/api/module";
import { useWorkflow } from "../../../../../../../../../../../../lib/hook/swr/useWorkflow";
import { TrashIcon } from "@radix-ui/react-icons";
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
            className="flex flex-col w-[500px] min-w-[500px]"
          >
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                <div>{getModuleIcon(content.type) || content.type}</div>
                <div className="text-lg font-semibold">
                  {!isEdit ? (
                    <div onClick={() => setIsEdit(true)}>{content?.title}</div>
                  ) : (
                    <div className="flex gap-2">
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
            <div className="mt-4">
              {getModuleContentFormComponent(
                content.type,
                content.contents,
                sid,
                mid
              )}
            </div>
            <div className="w-full h-full flex justify-start items-end">
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
            </div>
          </SheetContent>
        </>
      )}
    </Sheet>
  );
}

export { ModuleContentEditor };
