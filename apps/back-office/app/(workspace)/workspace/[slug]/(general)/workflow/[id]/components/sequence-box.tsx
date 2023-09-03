import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardContent,
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
export interface SequenceBoxProps {
  sequenceId: string;
  title: string;
  stakeholder: string;
  modules: IModule[];
  satisfactionChecked: boolean;
}

function EmptySequenceBox() {
  return <div className="min-w-[320px] max-w-[320px] h-[280px]"></div>;
}

function SequenceBox({
  sequenceId,
  title,
  stakeholder,
  modules,
  satisfactionChecked,
}: SequenceBoxProps) {
  const router = useRouter();
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();

  const [moduleItems, setModuleItems] = useState(
    [...modules].sort((a, b) => a.order - b.order)
  );
  const [checked, setChecked] = useState(satisfactionChecked);

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

  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[320px] h-[280px] flex flex-col bg-white rounded-lg shadow-md p-1"
        accessKey={sequenceId}
      >
        <div className="flex justify-between items-center h-[50px] p-4">
          <div className="text-base font-semibold">{title}</div>
          {<Badge className="bg-violet-500">{stakeholder}</Badge>}
        </div>
        <div className="px-2 py-2 overflow-scroll">
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
