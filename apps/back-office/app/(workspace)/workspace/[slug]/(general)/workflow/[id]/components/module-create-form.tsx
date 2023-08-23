import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  LoadingButton,
  RadioGroup,
  RadioGroupItem,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import { useState } from "react";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { ModuleAPI } from "../../../../../../../../lib/api/module";
import { IModule, ModuleType } from "workflow-types";
import {
  moduleNameSchema,
  moduleTypeSchema,
} from "../../../../../../../../lib/form-schemas/module";
import { BellIcon, BoxIcon } from "@radix-ui/react-icons";

const moduleTypes = [
  {
    value: "notification",
    label: "알림",
    icon: <BellIcon />,
  },
  {
    value: "contents",
    label: "컨텐츠",
    icon: <BoxIcon />,
  },
];

const moduleCreateFormSchema = z.object({
  name: moduleNameSchema,
  type: moduleTypeSchema,
});

type ModuleCreateFormValues = z.infer<typeof moduleCreateFormSchema>;

function ModuleCreateForm({
  sequenceId,
  setOpen,
  setModuleItems,
  targetOrder,
}: {
  sequenceId: string;
  setOpen: (open: boolean) => void;
  setModuleItems: (modules: IModule[]) => void;
  targetOrder: number;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflowMutate } = useWorkflow(currentWorkflowId);
  const [requesting, setRequesting] = useState(false);
  const form = useForm<ModuleCreateFormValues>({
    resolver: zodResolver(moduleCreateFormSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await ModuleAPI.createOne(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        {
          name: data.name,
          type: moduleTypes.find((type) => type.label === data.type)
            .value as ModuleType,
          content: {},
          order: targetOrder,
        }
      );
      const newData = await workflowMutate();
      const newModules = newData.sequences.find(
        (sequence) => sequence.id === sequenceId
      ).modules;
      setModuleItems(newModules);
      setRequesting(false);
      setOpen(false);
      pushSuccessToast("모듈 생성", "모듈이 생성되었습니다.");
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
                  모듈 명
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  타입 선택
                </FormLabel>
                <FormDescription className="text-xs">
                  모듈의 타입을 선택합니다.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {moduleTypes.map((type) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={type.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={type.label} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {type.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
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
              생성하기
            </Button>
          ) : (
            <LoadingButton />
          )}
        </div>
      </form>
    </Form>
  );
}

export { ModuleCreateForm };
