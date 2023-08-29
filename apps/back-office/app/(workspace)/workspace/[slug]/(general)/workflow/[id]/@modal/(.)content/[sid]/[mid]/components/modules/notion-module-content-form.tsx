import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { z } from "zod";
import { ContentAPI } from "../../../../../../../../../../../../../lib/api/content";
import { useCurrentWorkspace } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../../../../../../lib/hook/useCurrentWorkflow";
import { useContent } from "../../../../../../../../../../../../../lib/hook/swr/useContent";

const notionModuleUpdateFormSchema = z.object({
  notionUrl: z.string().url(),
});

type NotionModuleUpdateFormValues = z.infer<
  typeof notionModuleUpdateFormSchema
>;

function NotionModuleContentForm({ content, sequenceId, moduleId }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { contentMutate } = useContent(sequenceId, moduleId);

  const [requesting, setRequesting] = useState(false);

  const form = useForm<NotionModuleUpdateFormValues>({
    resolver: zodResolver(notionModuleUpdateFormSchema),
    defaultValues: {
      notionUrl: content.notionUrl || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await ContentAPI.patchNotion(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        moduleId,
        data.notionUrl
      );
      await contentMutate();
      pushSuccessToast("저장 완료", "노션 페이지가 저장되었습니다.");
      setRequesting(false);
    } catch (e) {
      pushFailToast("저장 실패", "노션 페이지를 저장하지 못했습니다.");
      setRequesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="notionUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Notion URL
                </FormLabel>
                <FormDescription>
                  전달할 Notion 페이지의 URL을 입력해주세요.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          {!requesting ? (
            <Button
              type="submit"
              className="w-fit bg-violet-600 hover:bg-violet-700"
            >
              저장하기
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-fit bg-violet-600 hover:bg-violet-700"
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

export { NotionModuleContentForm };
