import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  ModuleType,
  Switch,
  getModuleIcon,
} from "ui";

import { IModule } from "workflow-types";
import { SortableList } from "./sortable-list";
import { ModuleCreateDialog } from "./module-create-dialog";
import { ModuleAPI } from "../../../../../../../../lib/api/module";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { ChatBubbleIcon, TextIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SequenceAPI } from "../../../../../../../../lib/api/sequence";
import { SequenceDeleteDialog } from "./sequence-delete-dialog";
import { EditIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seqeunceNameSchema } from "../../../../../../../../lib/form-schemas/sequence";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
import { z } from "zod";
import { SequenceDateUpdateForm } from "./sequence-date-update-form";
export interface SequenceBoxProps {
  sequenceId: string;
  title: string;
  stakeholder: string;
  modules: IModule[];
  satisfactionChecked: boolean;
  date: string;
}

function EmptySequenceBox() {
  return <div className="min-w-[320px] max-w-[320px] h-[280px]"></div>;
}

const sequenceNameUpdateFormSchema = z.object({
  name: seqeunceNameSchema,
});

type ModuleNameUpdateFormValues = z.infer<typeof sequenceNameUpdateFormSchema>;

function SequenceBox({
  sequenceId,
  title,
  stakeholder,
  modules,
  satisfactionChecked,
  date,
}: SequenceBoxProps) {
  const router = useRouter();
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflowMutate } = useWorkflow(currentWorkflowId);

  const [moduleItems, setModuleItems] = useState(
    [...modules].sort((a, b) => a.order - b.order)
  );
  const [checked, setChecked] = useState(satisfactionChecked);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<ModuleNameUpdateFormValues>({
    resolver: zodResolver(sequenceNameUpdateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await SequenceAPI.update(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        { name: data.name }
      );
      await workflowMutate();
      setIsEdit(false);
    } catch (e) {
      console.error(e);
    }
    setIsEdit(false);
  };

  const moduleClickHandler = (e) => {
    const currentModuleId = e.currentTarget.id;
    const targetPath = `/workspace/${currentWorkspaceId}/workflow/${currentWorkflowId}/content/${sequenceId}/${currentModuleId}`;
    router.push(targetPath);
  };

  const satisfactionCheckedHandler = async (checked: boolean) => {
    setChecked(checked);
    await SequenceAPI.update(
      currentWorkspaceId,
      currentWorkflowId,
      sequenceId,
      {
        checkSatisfaction: checked,
      }
    );
  };

  const satisfactionSwitchHandler = (checked: boolean) => {
    satisfactionCheckedHandler(checked);
  };

  const moduleOrderUpdateHandler = (moduleItems) => {
    moduleItems.forEach((item, index) => {
      ModuleAPI.updateOrder(
        currentWorkspaceId,
        currentWorkflowId,
        sequenceId,
        item.id,
        {
          name: item.name,
          order: item.order,
        }
      );
    });
  };

  useEffect(() => {
    setModuleItems([...modules].sort((a, b) => a.order - b.order));
  }, [modules]);

  useEffect(() => {
    if (title) {
      form.setValue("name", title);
    }
  }, [title]);

  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[320px] h-[280px] flex flex-col bg-white rounded-lg shadow-md p-1"
        accessKey={sequenceId}
      >
        <div className="flex justify-between items-center p-4 flex-wrap gap-2">
          <div className="text-base font-semibold">
            {!isEdit ? (
              <div
                onClick={() => setIsEdit(true)}
                className="flex items-center hover:cursor-pointer"
              >
                {title}
                <EditIcon className="h-4 w-4 ml-2" />
              </div>
            ) : (
              <div className="flex gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" variant="ghost">
                        <SaveIcon />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
          {<Badge className="bg-violet-500">{stakeholder}</Badge>}
        </div>
        <div className="px-2 py-2 overflow-scroll scrollbar-hide">
          {modules.length > 0 ? (
            <SortableList
              items={moduleItems}
              onChange={setModuleItems}
              onSortEnd={moduleOrderUpdateHandler}
              renderItem={(item) => {
                return (
                  <SortableList.Item
                    id={item.id}
                    onClick={moduleClickHandler}
                    className="hover:cursor-pointer hover:bg-stone-100"
                  >
                    <ModuleInfo type={item.type} name={item.name} />
                    <SortableList.DragHandle />
                  </SortableList.Item>
                );
              }}
            />
          ) : null}
          <Card className="mt-2">
            <CardContent className="flex justify-between p-2">
              <div className="ml-1 flex gap-3 items-center text-sm font-semibold">
                <ChatBubbleIcon className="w-5 h-5" />
                <div>만족도 조사</div>
              </div>
              <Switch
                checked={checked}
                onCheckedChange={satisfactionSwitchHandler}
              />
            </CardContent>
          </Card>
          <ModuleCreateDialog
            lastOrder={modules.length}
            sequenceId={sequenceId}
            setModuleItems={setModuleItems}
          />
          <div className="w-full flex items-center">
            <div className="w-full flex justify-end  mt-2">
              <SequenceDateUpdateForm sequenceId={sequenceId} date={date} />
            </div>
            <div className="w-full flex justify-end mt-2">
              <SequenceDeleteDialog
                sequenceId={sequenceId}
                workflowId={currentWorkflowId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleInfo({ type, name }: { type: ModuleType; name: string }) {
  return (
    <div className="flex gap-2 ml-2 items-center">
      {getModuleIcon(type, "sm") || <TextIcon />}
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
}

export { EmptySequenceBox, SequenceBox };
