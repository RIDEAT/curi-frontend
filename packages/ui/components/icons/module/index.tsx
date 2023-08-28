import { FinishedIcon } from "./finished-icon";
import { FormIcon } from "./form-icon";
import { NotificationIcon } from "./notification-icon";
import { NotionIcon } from "./notion-icon";
import { YoutubeIcon } from "./youtube-icon";

export type ModuleType =
  | "notification"
  | "contents"
  | "survey"
  | "finished"
  | "slack"
  | "google_docs"
  | "notion"
  | "youtube"
  | "google_form"
  | "google_drive"
  | "web_url";

const getModuleIcon = (type: ModuleType) => {
  switch (type) {
    case "finished":
      return <FinishedIcon />;
    case "survey":
      return <FormIcon />;
    case "notification":
      return <NotificationIcon />;
    case "notion":
      return <NotionIcon />;
    case "youtube":
      return <YoutubeIcon />;
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
