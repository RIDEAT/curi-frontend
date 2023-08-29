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
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";

const sequenceCreateFormSchema = z.object({
  name: seqeunceNameSchema,
  role: seqeunceRoleSchema,
  dayOffset: seqeunceDayOffsetSchema,
  prevSequence: prevSequenceSchema,
});

type SequenceCreateFormValues = z.infer<typeof sequenceCreateFormSchema>;

function SequenceCreateForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { currentRoles } = useCurrentRoles();
  const { workflowMutate } = useWorkflow(currentWorkflowId);
  const [requesting, setRequesting] = useState(false);
  const form = useForm<SequenceCreateFormValues>({
    resolver: zodResolver(sequenceCreateFormSchema),
    defaultValues: {
      name: "",
      role: "",
      dayOffset: "0",
      prevSequence: "0",
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await SequenceAPI.createOne(currentWorkspaceId, currentWorkflowId, {
        name: data.name,
        roleId: currentRoles
          .find((role) => role.name === data.role)
          .id.toString(),
        dayOffset: Number(data.dayOffset),
        prevSequenceId: data.prevSequence,
      });
      await workflowMutate();

      pushSuccessToast("시퀀스 생성 완료", "시퀀스가 생성되었습니다.");
      setOpen(false);
      setRequesting(false);
    } catch (error) {
      pushFailToast("시퀀스 생성 실패", "다시 시도해주세요.");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  시퀀스 명
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  역할 선택
                </FormLabel>
                <FormDescription className="text-xs">
                  시퀀스가 할당될 멤버의 역할을 선택합니다.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {currentRoles &&
                      currentRoles?.map((role) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={role.id}
                        >
                          <FormControl>
                            <RadioGroupItem value={role.name} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {role.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dayOffset"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  실행 일자
                </FormLabel>
                <FormDescription className="text-xs">
                  시퀀스가 실행되는 날짜를 설정합니다. 0일은 입사일입니다.
                  -10일은 입사일 10일 전입니다.
                </FormDescription>
                <div className="w-[250px] flex gap-2 items-center">
                  <FormLabel className="min-w-[100px]">입사일 기준</FormLabel>
                  <FormControl className="min-w-[100px]">
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormLabel className="min-w-[100px]">일에 실행</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="prevSequence"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormLabel> 시퀀스가 끝난 후 수행</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <div className="w-full flex justify-end">
          {!requesting ? (
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              생성하기
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

export { SequenceCreateForm };
