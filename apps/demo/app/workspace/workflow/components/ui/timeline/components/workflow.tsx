import { SequenceBox, TimeBox, TimeBoxProps } from "./sequence";

export interface WorkflowTimelineProps {
  // timelineData: TimeBoxProps[];
  timelineData: any[];
}

function WorkflowTimeline({ timelineData }: WorkflowTimelineProps) {
  return (
    <>
      <div className="w-full h-screen overflow-scroll scrollbar-hide">
        <div className="m-5 flex flex-col justify-center items-start tour-workflow-timeline">
          {timelineData.map((data) => {
            return (
              <TimeBox
                key={data["day-offset"]}
                date={data["day-offset"]}
                employeeSequence={
                  Object.keys(data.left).length ? (
                    <SequenceBox
                      title={data.left.title}
                      stakeholder={data.left.role}
                      sequenceData={data.left.modules || []}
                    />
                  ) : null
                }
                managerSequence={
                  Object.keys(data.right).length ? (
                    <SequenceBox
                      title={data.right.title}
                      stakeholder={data.right.role}
                      sequenceData={data.right.modules || []}
                    />
                  ) : null
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export { WorkflowTimeline };
