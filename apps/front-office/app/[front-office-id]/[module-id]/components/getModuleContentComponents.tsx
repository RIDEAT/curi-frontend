import {
  GOOGLE_DOCS_MODULE_VALUE,
  ModuleType,
  NOTION_MODULE_VALUE,
  YOUTUBE_MODULE_VALUE,
} from "ui";
import { NotionModuleContent } from "./modules/notion-module-content";
import { YoutubeModuleContent } from "./modules/youtube-module-content";
import { GoogleDocsModuleContent } from "./modules/google-docs-module-content";

const getModuleContentComponents = (contents: any, type: ModuleType) => {
  switch (type) {
    case NOTION_MODULE_VALUE:
      return <NotionModuleContent contents={contents} />;
      break;

    case YOUTUBE_MODULE_VALUE:
      return <YoutubeModuleContent contents={contents} />;
      break;

    case GOOGLE_DOCS_MODULE_VALUE:
      return <GoogleDocsModuleContent contents={contents} />;
      break;

    default:
      return <div>no matching module type</div>;
      break;
  }
};

export { getModuleContentComponents };
