import { NotionModuleContent } from "./modules/notion-module-content";
import { YoutubeModuleContent } from "./modules/youtube-module-content";
import { GoogleDocsModuleContent } from "./modules/google-docs-module-content";
import { GoogleFormModuleContent } from "./modules/google-form-module-content";
import { WebUrlModuleContent } from "./modules/web-url-module-content";
import { QuizModuleContent } from "./modules/quiz-module-content";
import {
  CONTENTS_MODULE_VALUE,
  GOOGLE_DOCS_MODULE_VALUE,
  GOOGLE_FORM_MODULE_VALUE,
  ModuleType,
  NOTION_MODULE_VALUE,
  WEB_URL_MODULE_VALUE,
  YOUTUBE_MODULE_VALUE,
  QUIZ_MODULE_VALUE,
  ATTACHMENT_MODULE_VALUE,
} from "../icons";
import { ContentsModuleContent } from "./modules/contents-module-content";
import { AttachmentsModuleContent } from "./modules/attachments-module-content";

const getModuleContentComponents = (
  contents: any,
  type: ModuleType,
  options?: { uploader: any }
) => {
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

    case GOOGLE_FORM_MODULE_VALUE:
      return <GoogleFormModuleContent contents={contents} />;

    case WEB_URL_MODULE_VALUE:
      return <WebUrlModuleContent contents={contents} />;

    case CONTENTS_MODULE_VALUE:
      return <ContentsModuleContent contents={contents} />;

    case QUIZ_MODULE_VALUE:
      return <QuizModuleContent contents={contents} />;

    case ATTACHMENT_MODULE_VALUE:
      return (
        <AttachmentsModuleContent
          contents={contents}
          uploader={options?.uploader}
        />
      );

    default:
      return <div>no matching module type</div>;
      break;
  }
};

export { getModuleContentComponents };
