import { useState } from "react";
import { Badge } from "ui";

import { IModule } from "workflow-types";
import { SortableList } from "./sortable-list";
import { ModuleCreateDialog } from "./module-create-dialog";
import { ModuleAPI } from "../../../../../../../../lib/api/module";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentWorkflow } from "../../../../../../../../lib/hook/useCurrentWorkflow";
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
  const [moduleItems, setModuleItems] = useState(
    [...modules].sort((a, b) => a.order - b.order)
  );

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
              onSortEnd={(moduleItems) => {
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
              }}
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

export { EmptySequenceBox, SequenceBox };
