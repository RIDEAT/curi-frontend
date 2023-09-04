import {
  GOOGLE_DOCS_MODULE_VALUE,
  LoadingCircle,
  getModuleIcon,
} from "../../icons";
import { ExternalServiceLinkButton } from "./external-service-link-button";
import { ModuleDescriptionCard } from "./module-description-card";

function GoogleDocsModuleContent({ contents }: { contents: any }) {
  return (
    <div>
      {contents.url && (
        <div className="hidden sm:block">
          <iframe src={contents.url} width="100%" height="600px" />
        </div>
      )}
      <ModuleDescriptionCard description={contents?.description} />
      {contents.url ? (
        <ExternalServiceLinkButton url={contents.url}>
          {getModuleIcon(GOOGLE_DOCS_MODULE_VALUE)}
          <div>구글 문서에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { GoogleDocsModuleContent };
