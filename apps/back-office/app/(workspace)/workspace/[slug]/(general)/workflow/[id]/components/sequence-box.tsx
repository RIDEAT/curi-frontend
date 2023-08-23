import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Badge, Button, LoadingCircle, Sheet, pushSuccessToast } from "ui";
import { IModule } from "workflow-types";
import { ModuleAPI } from "../../../../../../../../lib/api/module";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { SortableList } from "./sortable-list";
import { useWorkflow } from "../../../../../../../../lib/hook/swr/useWorkflow";
export interface SequenceBoxProps {
  sequenceId: string;
  title: string;
  stakeholder: string;
  modules: IModule[];
}

function EmptySequenceBox() {
  return <div className="min-w-[320px] max-w-[320px] h-[280px]"></div>;
}

function SequenceBox({
  sequenceId,
  title,
  stakeholder,
  modules,
}: SequenceBoxProps) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { workflowMutate } = useWorkflow(currentWorkflowId);
  const [moduleItems, setModuleItems] = useState([...modules]);
  const [requesting, setRequesting] = useState(false);

  const createModuleHander = async () => {
    setRequesting(true);
    await ModuleAPI.createOne(
      currentWorkspaceId,
      currentWorkflowId,
      sequenceId,
      {
        name: "새로운 모듈",
        type: "notification",
        content: {},
        order: 0,
      }
    );
    const newData = await workflowMutate();
    const newModules = newData.sequences.find(
      (sequence) => sequence.id === sequenceId
    ).modules;
    setModuleItems(newModules);
    pushSuccessToast("모듈 생성", "모듈이 생성되었습니다.");
    setRequesting(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="w-[320px] h-[280px] flex flex-col bg-white rounded-lg shadow-md p-1"
        accessKey={sequenceId}
      >
        <div className="flex justify-between items-center h-[50px] p-4">
          <div className="text-base font-semibold">{title}</div>
          {<Badge>{stakeholder}</Badge>}
        </div>
        <div className="px-2 py-2 overflow-scroll">
          {modules.length > 0 ? (
            <SortableList
              items={moduleItems}
              onChange={setModuleItems}
              renderItem={(item) => (
                <SortableList.Item id={item.id}>
                  <p className="text-sm font-semibold ml-2 flex items-center">
                    {item.name}
                  </p>
                  <SortableList.DragHandle />
                </SortableList.Item>
              )}
            />
          ) : null}
          {!requesting ? (
            <Button
              variant="outline"
              className="mt-2 w-full h-10 border-2 border-dotted"
              onClick={createModuleHander}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              <p>New</p>
            </Button>
          ) : (
            <div className="mt-2 w-full h-10 flex justify-center items-center border-2 border-dotted">
              <LoadingCircle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { EmptySequenceBox, SequenceBox };
