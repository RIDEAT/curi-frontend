import { FinishedIcon } from "./finished-icon";
import { FormIcon } from "./form-icon";
import { NotificationIcon } from "./notification-icon";
import { NotionIcon } from "./notion-icon";
import { YoutubeIcon } from "./youtube-icon";

export const NOTIFICATION_MODULE_VALUE = "notification";
export const CONTENTS_MODULE_VALUE = "contents";
export const SURVEY_MODULE_VALUE = "survey";
export const FINISHED_MODULE_VALUE = "finished";
export const SLACK_MODULE_VALUE = "slack";
export const GOOGLE_DOCS_MODULE_VALUE = "google_docs";
export const NOTION_MODULE_VALUE = "notion";
export const YOUTUBE_MODULE_VALUE = "youtube";
export const GOOGLE_FORM_MODULE_VALUE = "google_form";
export const GOOGLE_DRIVE_MODULE_VALUE = "google_drive";
export const WEB_URL_MODULE_VALUE = "web_url";

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

const getModuleIcon = (type: ModuleType, size?: "sm" | "lg") => {
  switch (type) {
    case FINISHED_MODULE_VALUE:
      return <FinishedIcon />;
    case SURVEY_MODULE_VALUE:
      return <FormIcon />;
    case NOTIFICATION_MODULE_VALUE:
      return <NotificationIcon />;
    case NOTION_MODULE_VALUE:
      return <NotionIcon size={size} />;
    case YOUTUBE_MODULE_VALUE:
      return <YoutubeIcon size={size} />;
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
