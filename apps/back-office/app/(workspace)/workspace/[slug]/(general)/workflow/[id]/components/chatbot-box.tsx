import { z } from "zod";
import {
  prevSequenceSchema,
  seqeunceDayOffsetSchema,
  seqeunceNameSchema,
  seqeunceRoleSchema,
} from "../../../../../../../../lib/form-schemas/sequence";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SequenceAPI } from "../../../../../../../../lib/api/sequence";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
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
  RadioGroup,
  RadioGroupItem,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { useState } from "react";
import { useCurrentRoles } from "../../../../../../../../lib/hook/swr/useCurrentRoles";
import { ChatbotAPI } from "../../../../../../../../lib/api/chatbot";

const chatBotFormSchema = z.object({
  message: z.string(),
});

type ChatbotFormValue = z.infer<typeof chatBotFormSchema>;

function ChatbotBox({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { currentRoles } = useCurrentRoles();
  const [requesting, setRequesting] = useState(false);
  const form = useForm<ChatbotFormValue>({
    resolver: zodResolver(chatBotFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      var result = await ChatbotAPI.questionToChatbot(
        currentWorkspaceId,
        currentWorkflowId,
        data.message
      );
      console.log(result);

      pushSuccessToast("챗봇 답변", result.message);
      setOpen(false);
      setRequesting(false);
    } catch (error) {
      pushFailToast("챗봇 답변 실패", "다시 시도해주세요.");
      setOpen(false);
      setRequesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">질문</FormLabel>
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
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              질문하기
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
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

export { ChatbotBox };
