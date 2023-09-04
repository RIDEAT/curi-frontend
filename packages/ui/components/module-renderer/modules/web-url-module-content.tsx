import {
  LoadingCircle,
  WEB_URL_MODULE_VALUE,
  getModuleIcon,
} from "../../icons";
import { ExternalServiceLinkButton } from "./external-service-link-button";
import { ModuleDescriptionCard } from "./module-description-card";

function WebUrlModuleContent({ contents }: { contents: any }) {
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
          {getModuleIcon(WEB_URL_MODULE_VALUE)}
          <div>새 창에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { WebUrlModuleContent };
