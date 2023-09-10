import { useEffect, useState } from "react";
import { ISequence } from "workflow-types";
import { TimeLineVerticalElement } from "./timeline-vertical-element";
import { EmptySequenceBox, SequenceBox } from "./sequence-box";
import { EMPLOYEE_NAME } from "../../../../../../../../lib/constant/role";

export interface TimeBoxProps {
  date: string;
  sequences?: ISequence[];
}

export interface IBindSequence {
  left?: ISequence;
  right?: ISequence;
}

function TimeBoxes({ date, sequences }: TimeBoxProps) {
  const [employeeSequence, setEmployeeSequence] = useState<ISequence[]>([]);
  const [managerSequence, setManagerSequence] = useState<ISequence[]>([]);
  const [bindSequence, setBindSequence] = useState<IBindSequence[]>([]);

  useEffect(() => {
    if (sequences) {
      setEmployeeSequence(
        sequences.filter((sequence) => sequence.role.name == EMPLOYEE_NAME)
      );
      setManagerSequence(
        sequences.filter((sequence) => sequence.role.name != EMPLOYEE_NAME)
      );
    }
  }, [sequences]);

  useEffect(() => {
    if (employeeSequence.length || managerSequence.length) {
      const bindSequence = [];
      for (
        let i = 0;
        i < Math.max(employeeSequence.length, managerSequence.length);
        i++
      ) {
        bindSequence.push({
          left: employeeSequence[i],
          right: managerSequence[i],
        });
      }
      setBindSequence(bindSequence);
    }
  }, [employeeSequence, managerSequence]);

  return (
    <>
      {bindSequence.map((sequence, index) => (
        <TimeBox
          key={index}
          employeeSequence={sequence.left}
          managerSequence={sequence.right}
          date={date}
        />
      ))}
    </>
  );
}

function TimeBox({
  employeeSequence,
  managerSequence,
  date,
}: {
  employeeSequence?: ISequence;
  managerSequence?: ISequence;
  date: string;
}) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 pb-2">
        {employeeSequence ? (
          <SequenceBox
            key={employeeSequence.id}
            sequenceId={employeeSequence.id}
            title={employeeSequence.name}
            stakeholder={employeeSequence.role.name}
            modules={[...employeeSequence.modules]}
            satisfactionChecked={employeeSequence.checkSatisfaction}
            date={date}
          />
        ) : (
          <EmptySequenceBox />
        )}
      </div>
      <div className="relative h-full">
        <TimeLineVerticalElement
          date={Number(date) < 0 ? date : Number(date) == 0 ? "-0" : "+" + date}
          left={!!employeeSequence}
          right={!!managerSequence}
        />
      </div>
      <div className="flex flex-col gap-2 pb-2">
        {managerSequence ? (
          <SequenceBox
            key={managerSequence.id}
            sequenceId={managerSequence.id}
            title={managerSequence.name}
            stakeholder={managerSequence.role.name}
            modules={[...managerSequence.modules]}
            satisfactionChecked={managerSequence.checkSatisfaction}
            date={date}
          />
        ) : (
          <EmptySequenceBox />
        )}
      </div>
    </div>
  );
}

export { TimeBoxes };
