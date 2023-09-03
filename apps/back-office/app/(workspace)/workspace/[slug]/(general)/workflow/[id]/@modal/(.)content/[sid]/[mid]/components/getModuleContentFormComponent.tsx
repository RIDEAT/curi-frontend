import {
  GOOGLE_DOCS_MODULE_VALUE,
  GOOGLE_FORM_MODULE_VALUE,
  ModuleType,
  NOTION_MODULE_VALUE,
  YOUTUBE_MODULE_VALUE,
} from "ui";
import { NotionModuleContentForm } from "./modules/notion-module-content-form";
import { YoutubeModuleContentForm } from "./modules/youtube-module-content-form";
import { GoogleDocsModuleContentForm } from "./modules/google-docs-module-content-form";
import { GoogleFormModuleContentForm } from "./modules/google-form-module-content-form";

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
    case GOOGLE_DOCS_MODULE_VALUE:
      return (
        <GoogleDocsModuleContentForm
          content={content}
          sequenceId={sequenceId}
          moduleId={moduleId}
        />
      );
    case GOOGLE_FORM_MODULE_VALUE:
      return (
        <GoogleFormModuleContentForm
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
