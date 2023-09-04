import {
  GOOGLE_FORM_MODULE_VALUE,
  LoadingCircle,
  getModuleIcon,
} from "../../icons";
import { ExternalServiceLinkButton } from "./external-service-link-button";
import { ModuleDescriptionCard } from "./module-description-card";

function GoogleFormModuleContent({ contents }: { contents: any }) {
  return (
    <div>
      {contents.url && (
        <div>
          <iframe src={contents.url} width="100%" height="600px" />
        </div>
      )}
      <ModuleDescriptionCard description={contents?.description} />
      {contents.url ? (
        <ExternalServiceLinkButton url={contents.url}>
          {getModuleIcon(GOOGLE_FORM_MODULE_VALUE)}
          <div>구글 문서에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { GoogleFormModuleContent };
