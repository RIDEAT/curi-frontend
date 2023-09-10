import { z } from "zod";
import { seqeunceDayOffsetSchema } from "../../../../../../../../lib/form-schemas/sequence";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SequenceAPI } from "../../../../../../../../lib/api/sequence";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
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
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";

const sequenceDateUpdateFormSchema = z.object({
  dayOffset: seqeunceDayOffsetSchema,
});

type SequenceDateUpdateFormValues = z.infer<
  typeof sequenceDateUpdateFormSchema
>;

function SequenceDateUpdateForm({
  sequenceId,
  date,
}: {
  sequenceId: string;
  date: string;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflowMutate } = useWorkflow(currentWorkflowId);

  const form = useForm<SequenceDateUpdateFormValues>({
    resolver: zodResolver(sequenceDateUpdateFormSchema),
    defaultValues: {
      dayOffset: "0",
    },
  });

  const onSubmit = async (data) => {
    try {
      await SequenceAPI.update(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        {
          dayOffset: Number(data.dayOffset),
        }
      );
      await workflowMutate();
    } catch (error) {
      pushFailToast("시퀀스 수정 실패", "다시 시도해주세요.");
    }
  };

  useEffect(() => {
    form.reset({ dayOffset: date });
  }, [date]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-2">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="dayOffset"
              render={({ field }) => (
                <FormItem>
                  <div className="w-fit flex gap-2 items-center">
                    <FormLabel>D</FormLabel>
                    <FormControl className="max-w-[100px]">
                      <Input type="number" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-fit flex">
            <Button type="submit" variant="ghost" className="w-fit">
              <SaveIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { SequenceDateUpdateForm };
