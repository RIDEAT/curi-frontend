import { z } from "zod";
import { workflowNameSchema } from "../../../../../../../lib/form-schemas/workflow";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkflowAPI } from "../../../../../../../lib/api/workflow";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingButton,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { useWorkflows } from "../../../../../../../lib/hook/swr/useWorkflows";

const workflowEditFormSchema = z.object({
  name: workflowNameSchema,
});

type WorkflowEditFormValues = z.infer<typeof workflowEditFormSchema>;

function WorkflowEditForm({
  workflowId,
  currentWorkflowName,
  setIsOpen,
}: {
  workflowId: string;
  currentWorkflowName: string;
  setIsOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { workflowsMutate } = useWorkflows();
  const [requesting, setRequesting] = useState(false);
  const form = useForm<WorkflowEditFormValues>({
    resolver: zodResolver(workflowEditFormSchema),
    defaultValues: {
      name: currentWorkflowName,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await WorkflowAPI.updateWorkflowName(
        currentWorkspaceId,
        workflowId,
        data.name
      );
      await workflowsMutate();
      pushSuccessToast("워크플로우 수정", "워크플로우가 수정되었습니다.");
    } catch (error) {
      pushFailToast("워크플로우 수정 실패", "다시 시도해주세요.");
    }
    setIsOpen(false);
    setRequesting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>워크플로우 명</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          {!requesting ? (
            <Button type="submit">저장하기</Button>
          ) : (
            <LoadingButton />
          )}
        </div>
      </form>
    </Form>
  );
}

export { WorkflowEditForm };
