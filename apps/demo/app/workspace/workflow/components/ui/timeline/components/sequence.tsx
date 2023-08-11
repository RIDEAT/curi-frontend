import { ReactNode, useState } from "react";
import { DraggableList, Sheet } from "ui";
import {
  StakeholderType,
  getStakeholderBadge,
} from "../../../../../../../components/badges/stakeholder-badges";
import { IModuleData, ModuleBox, ModuleContent } from "./module";

export interface TimeBoxProps {
  date: string;
  employeeSequence?: ReactNode;
  managerSequence?: ReactNode;
}

function EmptySequenceBox() {
  return <div className="w-[320px] h-[280px]"></div>;
}

function TimeBox({ date, employeeSequence, managerSequence }: TimeBoxProps) {
  return (
    <div className="flex h-[310px]">
      {employeeSequence ? employeeSequence : <EmptySequenceBox />}
      <div className="relative h-full">
        <TimeLineVerticalElement
          date={Number(date) < 0 ? date : Number(date) == 0 ? "-0" : "+" + date}
          left={!!employeeSequence}
          right={!!managerSequence}
        />
      </div>
      {managerSequence}
    </div>
  );
}

export interface SequenceBoxProps {
  title: string;
  stakeholder: StakeholderType;
  sequenceData: IModuleData[];
}

function SequenceBox({ title, stakeholder, sequenceData }: SequenceBoxProps) {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(sequenceData[0].id);

  const getModuleById = (id: string) => {
    const resultModule = sequenceData.find((data) => data.id == id);

    return resultModule;
  };

  return (
    <div className="flex justify-center items-center tour-workflow-sequence">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="w-[320px] h-[280px] bg-white rounded-lg shadow-md p-1">
          <div className="flex justify-between items-center h-[50px] p-4">
            <div className="text-base font-medium">{title}</div>
            {getStakeholderBadge(stakeholder)}
            {/* <div className="text-xs font-medium bg-yellow-200 p-1 pl-2 pr-2 rounded-md">
                신입
              </div> */}
          </div>
          <DraggableList
            data={sequenceData}
            renderItemContent={(type, title) => (
              <ModuleBox type={type} title={title} />
            )}
            onItemClick={(e) => {
              setCurrentId(e.currentTarget.accessKey);
              setOpen((prev) => !prev);
            }}
          />
        </div>
        <ModuleContent module={getModuleById(currentId)} />
      </Sheet>
    </div>
  );
}

function TimeLineVerticalElement({
  date,
  left = true,
  right = true,
}: {
  date: string;
  left?: boolean;
  right?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="95"
      height="311"
      viewBox="0 0 95 311"
      fill="none"
    >
      <line
        x1="48"
        y1="4.37114e-08"
        x2="48"
        y2="150"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <text
        x={(() => {
          if (left && right) return "25";
          else if (left && !right) return "25";
          else return "70";
        })()}
        y={145}
        textAnchor="middle"
        fill="#8E00BF"
        fontSize="12"
        fontWeight="bold"
      >
        {"D" + date}
      </text>
      <circle cx="48" cy="156" r="5.5" stroke="#8E00BF" strokeOpacity="0.85" />
      {right && (
        <line
          x1="53"
          y1="156"
          x2="95"
          y2="156"
          stroke="#8E00BF"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      )}
      {left && (
        <line
          x1="1"
          y1="156"
          x2="43"
          y2="156"
          stroke="#8E00BF"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="2 2"
        />
      )}
      <line
        x1="48"
        y1="161"
        x2="48"
        y2="311"
        stroke="#9101C2"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <g filter="url(#filter0_f_13_1369)">
        <circle cx="48" cy="156" r="3" fill="#A400DD" />
      </g>
      <g filter="url(#filter1_f_13_1369)">
        <circle cx="48" cy="156" r="3" fill="#A400BF" />
      </g>
      <defs>
        <filter
          id="filter0_f_13_1369"
          x="40"
          y="148"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.5"
            result="effect1_foregroundBlur_13_1369"
          />
        </filter>
        <filter
          id="filter1_f_13_1369"
          x="44"
          y="152"
          width="8"
          height="8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.5"
            result="effect1_foregroundBlur_13_1369"
          />
        </filter>
      </defs>
    </svg>
  );
}

export { TimeBox, SequenceBox };
