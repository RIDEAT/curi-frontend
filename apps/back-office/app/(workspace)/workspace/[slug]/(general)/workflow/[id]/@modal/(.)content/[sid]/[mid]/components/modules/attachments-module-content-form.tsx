import { z } from "zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentWorkspace } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkflow";
import { useContent } from "../../../../../../../../../../../../../lib/hook/swr/useContent";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingCircle,
  Textarea,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { ContentAPI } from "../../../../../../../../../../../../../lib/api/content";
import { cn } from "ui/lib/utils";
import { Trash2Icon, TrashIcon } from "lucide-react";

const attachmentsListSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);

const AttachmentsModuleUpdateFormSchema = z.object({
  attachments_list: attachmentsListSchema,
  description: z.string().max(500, {
    message: "상세 설명은 500자 이하로 입력해주세요.",
  }),
});

type AttachmentsModuleUpdateFormValues = z.infer<
  typeof AttachmentsModuleUpdateFormSchema
>;

function AttachmentsModuleContentForm({ content, sequenceId, moduleId }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { contentMutate } = useContent(sequenceId, moduleId);

  const [requesting, setRequesting] = useState(false);

  const form = useForm<AttachmentsModuleUpdateFormValues>({
    resolver: zodResolver(AttachmentsModuleUpdateFormSchema),
    defaultValues: {
      attachments_list:
        content.attachments.map((attachment, index) => {
          return { id: index, name: attachment.fileName };
        }) || [],
      description: content.description || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "attachments_list",
    control: form.control,
  });

  const addAttachment = () => {
    append({ id: fields?.length || 0, name: "" });
  };

  const removeAttachments = (id: number) => {
    remove(id);
  };

  const onSubmit = async (data) => {
    try {
      setRequesting(true);

      const requestAttachmentsList = data.attachments_list.filter(
        (attachment) => attachment.name !== ""
      );

      await ContentAPI.patchAttachemnts(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        moduleId,
        {
          attachments_list: requestAttachmentsList,
          description: data.description,
        }
      );

      await contentMutate();
      pushSuccessToast("저장 완료", "파일 제출 모듈이 저장되었습니다.");
      setRequesting(false);
    } catch (e) {
      console.error(e);
      pushFailToast("저장 실패", "파일 제출 모듈을 저장하지 못했습니다.");
      setRequesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          {!fields.length ? (
            <>
              <FormLabel className={cn("text-lg font-semibold")}>
                제출 목록 추가하기
              </FormLabel>
              <FormDescription>
                제출할 파일의 이름과 확장자를 입력해주세요.
              </FormDescription>
            </>
          ) : null}
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`attachments_list.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-lg font-semibold",
                      index !== 0 && "sr-only"
                    )}
                  >
                    제출 목록 추가하기
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    제출할 파일의 이름과 확장자를 입력해주세요.
                  </FormDescription>
                  <FormControl>
                    <div className="flex gap-4 items-center">
                      <div>{index + 1}. </div>
                      <Input {...field} />
                      <Button variant="ghost">
                        <TrashIcon
                          className="w-4 h-4"
                          onClick={() => removeAttachments(index)}
                        />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="h-full flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={addAttachment}
            >
              목록 추가하기
            </Button>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  안내 문구
                </FormLabel>
                <FormDescription></FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="위 사항의 안내 문구를 입력해주세요. (선택)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          {!requesting ? (
            <Button type="submit" variant="violet" className="w-fit">
              저장하기
            </Button>
          ) : (
            <Button
              type="submit"
              variant="violet"
              className="w-fit"
              disabled={true}
            >
              <LoadingCircle />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export { AttachmentsModuleContentForm };
