import { FinishedIcon } from "./finished-icon";
import { FormIcon } from "./form-icon";
import { NotificationIcon } from "./notification-icon";
import { QuizIcon } from "./quiz-icon";
import { TextIcon } from "./text-icon";
import { VideoIcon } from "./video-icon";

export type ModuleType =
  | "finished"
  | "form"
  | "notification"
  | "quiz"
  | "text"
  | "video";

const getModuleIcon = (type: ModuleType) => {
  switch (type) {
    case "finished":
      return <FinishedIcon />;
    case "form":
      return <FormIcon />;
    case "notification":
      return <NotificationIcon />;
    case "quiz":
      return <QuizIcon />;
    case "text":
      return <TextIcon />;
    case "video":
      return <VideoIcon />;
    default:
      return <></>;
  }
};

export { getModuleIcon };
export * from "./finished-icon";
export * from "./form-icon";
export * from "./notification-icon";
export * from "./quiz-icon";
export * from "./text-icon";
export * from "./video-icon";
