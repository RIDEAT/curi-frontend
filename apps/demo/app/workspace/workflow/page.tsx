"use client";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";

export default function Workflow() {
  return (
    <div className="w-screen h-screen overflow-scroll flex bg-stone-50">
      <div className="w-1/3 m-5">
        <TimeBox />
        <TimeBox />
        <TimeBox />
        <TimeBox />
        <TimeBox />
        <TimeBox />
      </div>
    </div>
  );
}

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

const SequenceBox = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[300px] h-[250px] bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center h-[50px] p-4">
          <div className="text-lg font-medium">신입사원을 환영합니다</div>
          <div className="text-md font-medium bg-orange-200 p-1 rounded-md">
            신입
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full h-[200px] p-4 pt-0 overflow-scroll">
          <ModuleBox />
          <ModuleBox />
          <ModuleBox />
          <ModuleBox />
          <ModuleBox />
          <ModuleBox />
          <ModuleBox />
        </div>
      </div>
    </div>
  );
};

const ModuleBox = () => {
  return (
    <div className="flex justify-between items-center w-full h-9  rounded-sm text-md font-medium bg-stone-100 p-2 shadow-sm">
      <div className="text-md">신입사원을 환영합니다</div>
      <div>
        <DragHandleDots2Icon />
      </div>
    </div>
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
        stroke-opacity="0.4"
        stroke-width="2"
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
      <circle cx="48" cy="156" r="5.5" stroke="#8E00BF" stroke-opacity="0.85" />
      <line
        x1="53"
        y1="156"
        x2="95"
        y2="156"
        stroke="#8E00BF"
        stroke-opacity="0.3"
        stroke-width="2"
        stroke-dasharray="2 2"
      />
      <line
        x1="1"
        y1="156"
        x2="43"
        y2="156"
        stroke="#8E00BF"
        stroke-opacity="0.3"
        stroke-width="2"
        stroke-dasharray="2 2"
      />
      <line
        x1="48"
        y1="161"
        x2="48"
        y2="311"
        stroke="#9101C2"
        stroke-opacity="0.4"
        stroke-width="2"
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
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
