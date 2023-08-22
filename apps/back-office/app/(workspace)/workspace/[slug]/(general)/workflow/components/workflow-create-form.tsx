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

const workflowCreateFormSchema = z.object({
  name: workflowNameSchema,
});

type WorkflowCreateFormValues = z.infer<typeof workflowCreateFormSchema>;

function WorkflowCreateForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { workflowsMutate } = useWorkflows();
  const [requesting, setRequesting] = useState(false);
  const form = useForm<WorkflowCreateFormValues>({
    resolver: zodResolver(workflowCreateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await WorkflowAPI.createWorkflow(currentWorkspaceId, data.name);
      await workflowsMutate();
      pushSuccessToast("워크플로우 생성 완료", "워크플로우가 생성되었습니다.");
      setOpen(false);
      setRequesting(false);
    } catch (error) {
      pushFailToast("워크플로우 생성 실패", "다시 시도해주세요.");
      setOpen(false);
      setRequesting(false);
    }
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
            <Button type="submit">생성하기</Button>
          ) : (
            <LoadingButton />
          )}
        </div>
      </form>
    </Form>
  );
}

export { WorkflowCreateForm };
