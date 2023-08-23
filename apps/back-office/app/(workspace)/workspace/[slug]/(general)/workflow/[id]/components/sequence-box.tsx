import { useState } from "react";
import { Badge, DraggableList, Sheet } from "ui";
import { IModule } from "workflow-types";

export interface SequenceBoxProps {
  title: string;
  stakeholder: string;
  modules: IModule[];
}

function EmptySequenceBox() {
  return <div className="min-w-[320px] max-w-[320px] h-[280px]"></div>;
}

function SequenceBox({ title, stakeholder, modules }: SequenceBoxProps) {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(modules[0]?.id);

  const getModuleById = (id: string) => {
    const resultModule = modules.find((data) => data.id == id);

    return resultModule;
  };

  return (
    <div className="flex justify-center items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="w-[320px] h-[280px] bg-white rounded-lg shadow-md p-1">
          <div className="flex justify-between items-center h-[50px] p-4">
            <div className="text-base font-semibold">{title}</div>
            {<Badge>{stakeholder}</Badge>}
            {/* <div className="text-xs font-medium bg-yellow-200 p-1 pl-2 pr-2 rounded-md">
                  신입
                </div> */}
          </div>
          <DraggableList
            data={modules}
            renderItemContent={(type, title) => (
              // <ModuleBox type={type} title={title} />
              <div className="flex justify-center items-center">
                <div className="w-[40px] h-[40px] bg-gray-200 rounded-md"></div>
                <div className="text-sm font-medium text-stone-600 ml-2">
                  {title}
                </div>
              </div>
            )}
            onItemClick={(e) => {
              setCurrentId(e.currentTarget.accessKey);
              setOpen((prev) => !prev);
            }}
          />
        </div>
        {/* <ModuleContent module={getModuleById(currentId)} /> */}
      </Sheet>
    </div>
  );
}

export { EmptySequenceBox, SequenceBox };
