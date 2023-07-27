"use client";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  DraggableList,
  Separator,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "ui";
import Editor from "./components/ui/editor";

export default function Workflow() {
  return (
    <div className="col-span-3 lg:col-span-4 lg:border-l bg-stone-50">
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              {"신입 공통 워크플로우"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {"모든 신입사원의 공통 워크플로우입니다."}
            </p>
          </div>
        </div>
        <WorkflowTimeline />
      </div>
    </div>
  );
}

const WorkflowTimeline = () => {
  return (
    <>
      <Separator className="my-4" />
      <div className="w-screen h-screen overflow-scroll flex ">
        <div className="w-1/3 m-5">
          <TimeBox />
          <TimeBox />
          <TimeBox />
          <TimeBox />
          <TimeBox />
          <TimeBox />
        </div>
      </div>
    </>
  );
};

const TimeBox = () => {
  return (
    <div className="flex h-[310px]">
      <SequenceBox />
      <div className="relative h-full">
        <TimeLineVerticalElement date="-0" />
      </div>
      <SequenceBox />
    </div>
  );
};

interface ListItem {
  id: string;
  title: string;
}

const listData: ListItem[] = [
  {
    id: "1",
    title: "First Item",
  },
  {
    id: "2",
    title: "Second Item",
  },
  {
    id: "3",
    title: "Third Item",
  },
  {
    id: "4",
    title: "Fourth Item",
  },
  {
    id: "5",
    title: "Fifth Item",
  },
  {
    id: "6",
    title: "Sixth Item",
  },

  // and so on...
];

const SequenceBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center">
      <div className="w-[320px] h-[280px] bg-white rounded-lg shadow-md p-1">
        <div className="flex justify-between items-center h-[50px] p-4">
          <div className="text-lg font-medium">신입사원을 환영합니다</div>
          <div className="text-xs font-medium bg-yellow-200 p-1 pl-2 pr-2 rounded-md">
            신입
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <DraggableList
            data={listData}
            renderItemContent={(title) => <ModuleBox title={title} />}
            onItemClick={() => {
              console.log("clicked");
              setOpen((prev) => !prev);
            }}
          />
          <SheetContent isBlur={true}>
            <Editor />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

const ModuleBox = ({ title }: { title: string }) => {
  return (
    <SheetTrigger asChild>
      <div className="flex justify-between items-center w-full h-11  rounded-sm text-md font-medium bg-stone-100 p-2 shadow-sm border border-stone-200">
        <div className="text-md">{title}</div>
        <div>
          <DragHandleDots2Icon />
        </div>
      </div>
    </SheetTrigger>
  );
};

const TimeLineVerticalElement = ({ date }: { date: string }) => {
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
        x="70"
        y={145}
        textAnchor="middle"
        fill="#8E00BF"
        fontSize="12"
        fontWeight="bold"
      >
        {"D" + date}
      </text>
      <circle cx="48" cy="156" r="5.5" stroke="#8E00BF" strokeOpacity="0.85" />
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
};
