import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const youtubeModuleUpdateFormSchema = z.object({
  url: z.string().url(),
  description: z.string().max(500, {
    message: "상세 설명은 500자 이하로 입력해주세요.",
  }),
});

type YoutubeModuleUpdateFormValues = z.infer<
  typeof youtubeModuleUpdateFormSchema
>;

function YoutubeModuleContentForm({ content, sequenceId, moduleId }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { contentMutate } = useContent(sequenceId, moduleId);

  const [requesting, setRequesting] = useState(false);

  const form = useForm<YoutubeModuleUpdateFormValues>({
    resolver: zodResolver(youtubeModuleUpdateFormSchema),
    defaultValues: {
      url: content.url || "",
      description: content.description || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await ContentAPI.patchYoutube(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        moduleId,
        {
          url: data.url,
          description: data.description,
        }
      );
      await contentMutate();
      pushSuccessToast("저장 완료", "유튜브 영상이 저장되었습니다.");
      setRequesting(false);
    } catch (e) {
      pushFailToast("저장 실패", "유튜브 영상을 저장하지 못했습니다.");
      setRequesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Youtube URL
                </FormLabel>
                <FormDescription>
                  전달할 Youtube 영상의 URL을 입력해주세요.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="전달할 Youtube 영상의 안내 문구를 입력해주세요. (선택)"
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

export { YoutubeModuleContentForm };
