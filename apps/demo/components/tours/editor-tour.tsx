import React from "react";
import JoyRide from "react-joyride";

const TOUR_STEPS = [
  {
    title: <p>🖌 AI 에디터 알아보기</p>,
    target: ".tour-editor-ai",
    content: (
      <div>
        <p>AI와 함께 컨텐츠를 작성해볼까요?</p>
        <p className="text-red-600">
          키보드에서 ++를 눌러보세요! 또는 / 를 눌러보세요!
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    title: <p>📱 미리보기</p>,
    target: ".tour-editor-preview",
    content: (
      <div>
        <p>이 컨텐츠가 어떻게 전달되는지 확인해볼까요?</p>
        <p>미리보기를 통해 컨텐츠를 확인할 수 있어요!</p>
      </div>
    ),
    disableBeacon: true,
  },
];

const EditorTour = () => {
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={false}
        showProgress={false}
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

export default EditorTour;
