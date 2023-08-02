import { TimeBox, TimeBoxProps } from "./sequence";

export interface WorkflowTimelineProps {
  timelineData: TimeBoxProps[];
}

function WorkflowTimeline({ timelineData }: WorkflowTimelineProps) {
  return (
    <>
      <div className="w-full h-screen overflow-scroll scrollbar-hide">
        <div className="m-5 flex flex-col justify-center items-start">
          {timelineData.map((data) => {
            return (
              <TimeBox
                key={data.date}
                date={data.date}
                employeeSequence={data.employeeSequence}
                managerSequence={data.managerSequence}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export { WorkflowTimeline };
