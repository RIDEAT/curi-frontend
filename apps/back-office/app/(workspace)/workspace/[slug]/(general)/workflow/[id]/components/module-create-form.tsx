import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import {
  Button,
  CONTENTS_MODULE_VALUE,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GOOGLE_DOCS_MODULE_VALUE,
  GOOGLE_FORM_MODULE_VALUE,
  Input,
  LoadingCircle,
  ModuleType,
  NOTION_MODULE_VALUE,
  RadioGroup,
  RadioGroupItem,
  WEB_URL_MODULE_VALUE,
  YOUTUBE_MODULE_VALUE,
  QUIZ_MODULE_VALUE,
  getModuleIcon,
  pushFailToast,
  pushSuccessToast,
  ATTACHMENT_MODULE_VALUE,
} from "ui";
import { useState } from "react";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { ModuleAPI } from "../../../../../../../../lib/api/module";
import { IModule } from "workflow-types";
import {
  moduleNameSchema,
  moduleTypeSchema,
} from "../../../../../../../../lib/form-schemas/module";

const moduleTypes = [
  {
    value: CONTENTS_MODULE_VALUE,
    label: "컨텐츠",
    icon: getModuleIcon(CONTENTS_MODULE_VALUE, "lg"),
  },
  {
    value: NOTION_MODULE_VALUE,
    label: "노션",
    icon: getModuleIcon(NOTION_MODULE_VALUE, "lg"),
  },
  {
    value: YOUTUBE_MODULE_VALUE,
    label: "youtube",
    icon: getModuleIcon(YOUTUBE_MODULE_VALUE, "lg"),
  },
  {
    value: GOOGLE_DOCS_MODULE_VALUE,
    label: "구글 문서",
    icon: getModuleIcon(GOOGLE_DOCS_MODULE_VALUE, "lg"),
  },
  {
    value: GOOGLE_FORM_MODULE_VALUE,
    label: "구글 설문",
    icon: getModuleIcon(GOOGLE_FORM_MODULE_VALUE, "lg"),
  },
  {
    value: WEB_URL_MODULE_VALUE,
    label: "웹 URL",
    icon: getModuleIcon(WEB_URL_MODULE_VALUE, "lg"),
  },
  {
    value: ATTACHMENT_MODULE_VALUE,
    label: "파일 제출",
    icon: getModuleIcon(ATTACHMENT_MODULE_VALUE, "lg"),
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
                    className="grid grid-cols-2 gap-4"
                  >
                    {moduleTypes.map((type) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={type.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={type.label}>
                            <div>{type.label}</div>
                          </RadioGroupItem>
                        </FormControl>
                        <FormLabel className="font-normal">
                          <div className="flex justify-between items-center">
                            <div className="w-20">{type.icon}</div>
                            <div className="text-base font-medium">
                              {type.label}
                            </div>
                          </div>
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

export { ModuleCreateForm };
