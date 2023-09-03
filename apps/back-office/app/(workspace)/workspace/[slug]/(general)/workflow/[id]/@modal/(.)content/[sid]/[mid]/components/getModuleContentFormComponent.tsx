import { ModuleType, NOTION_MODULE_VALUE, YOUTUBE_MODULE_VALUE } from "ui";
import { NotionModuleContentForm } from "./modules/notion-module-content-form";
import { YoutubeModuleContentForm } from "./modules/youtube-module-content-form";

const getModuleContentFormComponent = (
  type: ModuleType,
  content: any,
  sequenceId: string,
  moduleId: string
) => {
  switch (type) {
    case NOTION_MODULE_VALUE:
      return (
        <NotionModuleContentForm
          content={content}
          sequenceId={sequenceId}
          moduleId={moduleId}
        />
      );
    case YOUTUBE_MODULE_VALUE:
      return (
        <YoutubeModuleContentForm
          content={content}
          sequenceId={sequenceId}
          moduleId={moduleId}
        />
      );
    default:
      break;
  }
};

export { getModuleContentFormComponent };
