import { atom } from "jotai";
import {
  IModuleData,
  SequenceBox,
  TimeBoxProps,
} from "../../app/workspace/workflow/components/ui/timeline/components/workflow";

const sequenceData: IModuleData[] = [
  {
    id: "1",
    title: "First Module",
  },
  {
    id: "2",
    title: "Second Module",
  },
  {
    id: "3",
    title: "Third Module",
  },
  {
    id: "4",
    title: "Fourth Module",
  },
  {
    id: "5",
    title: "Fifth Module",
  },
  {
    id: "6",
    title: "Sixth Module",
  },

  // and so on...
];

const timelineData: TimeBoxProps[] = [
  {
    date: "-10",
    employeeSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-9",
    managerSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-3",
    employeeSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "-0",
    employeeSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
    managerSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+1",
    managerSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+2",
    employeeSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
    managerSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="manager"
        sequenceData={sequenceData}
      />
    ),
  },
  {
    date: "+6",
    employeeSequence: (
      <SequenceBox
        title="sequence title"
        stakeholder="employee"
        sequenceData={sequenceData}
      />
    ),
  },
];

export const timelineDataAtom = atom<TimeBoxProps[]>(timelineData);
