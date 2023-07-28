import { atom } from "jotai";
import {
  IModuleData,
  SequenceBox,
  TimeBoxProps,
} from "../../app/workspace/workflow/components/ui/timeline/components/workflow";

const sequenceData: IModuleData[] = [
  {
    id: "1",
    type: "notification",
    title: "안내",
  },
  {
    id: "2",
    type: "text",
    title: "지침",
  },
  {
    id: "3",
    type: "form",
    title: "설문",
  },
  {
    id: "4",
    type: "quiz",
    title: "퀴즈",
  },
  {
    id: "5",
    type: "video",
    title: "비디오",
  },
  {
    id: "6",
    type: "finished",
    title: "완료",
  },

  // and so on...
];

const timelineData: TimeBoxProps[] = [
  {
    date: "-10",
    employeeSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-9",
    managerSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-3",
    employeeSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-0",
    employeeSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
    managerSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+1",
    managerSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+2",
    employeeSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
    managerSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+6",
    employeeSequence: (
      <SequenceBox
        title="시퀀스명"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
];

export const timelineDataAtom = atom<TimeBoxProps[]>(timelineData);
