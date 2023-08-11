import React from "react";
import JoyRide, { STATUS } from "react-joyride";
import { workflowTourAtom } from "../../lib/context/tour";
import { useAtom } from "jotai";

const TOUR_STEPS = [
  {
    title: <p>🔎 워크플로우를 체험하시는군요!</p>,
    target: ".tour-workflow-tab",
    content: (
      <div>
        <p>안녕하세요 반갑습니다.</p>
        <p>워크플로우에 대해 설명해드릴게요!</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    title: <p>✒️ 워크플로우 이름 정하기</p>,
    target: ".tour-workflow-title",
    content: (
      <div>
        <p>여기에는 우리가 오늘 알아볼 워크플로우의 명칭이 들어가요.</p>
        <p>워크플로우의 이름은 언제든지 바꿀 수 있어요!</p>
      </div>
    ),
    // disableBeacon: true,
  },
  {
    title: <p>📝 타임라인 알아보기</p>,
    target: ".tour-workflow-timeline",
    content: (
      <div>
        <p>이 공간에서 워크플로우를 편집할 수 있어요.</p>
        <p>
          워크플로우는 신입과 매니저가 입사일을 기준으로 언제 무엇을 할지
          설계하는 곳이에요!
        </p>
      </div>
    ),
  },
  {
    title: <p>📝 시퀀스 알아보기</p>,
    target: ".tour-workflow-sequence",
    content: (
      <div>
        <p>이 박스는 하나의 시퀀스라고 불려요.</p>
        <p>
          시퀀스에는 여러개의 모듈이 속하고, 각 모듈의 내용이 시퀀스의 대상에게
          전달되어요!
        </p>
      </div>
    ),
  },
  {
    title: <p>🧱 모듈 알아보기</p>,
    target: ".tour-workflow-module",
    content: <div>그럼 이번엔 모듈을 알아볼까요? 이 모듈을 클릭해보세요.</div>,
    lifecycle: "beacon",
  },
  {
    title: <p>🖌 AI 에디터 알아보기</p>,
    target: ".tour-workflow-editor",
    content: <div>AI와 함께 컨텐츠를 작성해볼까요?</div>,
    lifecycle: "beacon",
  },
];

const WorkflowTour = () => {
  const [workflowTour, setWorkflowTour] = useAtom(workflowTourAtom);
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setWorkflowTour(false);
    }
  };
  return (
    <>
      <JoyRide
        callback={handleJoyrideCallback}
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={false}
        showProgress={false}
        run={workflowTour}
        styles={{
          tooltipContainer: {
            textAlign: "left",
            fontWeight: 500,
          },
          buttonNext: {
            backgroundColor: "#8B5CF6",
          },
          buttonBack: {
            color: "#515151",
            marginRight: 10,
          },
          buttonSkip: {
            color: "#a6bac2",
            marginRight: 10,
          },
        }}
      />
    </>
  );
};

export default WorkflowTour;
