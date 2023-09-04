import { NOTION_MODULE_VALUE, getModuleIcon } from "../../icons";
import { ExternalServiceLinkButton } from "./external-service-link-button";
import { Button } from "../../ui/button";

function NotionModuleContent({ contents }: { contents: any }) {
  return (
    <div>
      {contents.notionUrl ? (
        <>
          <div className="flex flex-col text-base font-medium">
            <div>노션으로 작성된 문서입니다.</div>
            <div>아래버튼을 눌러, 노션에서 확인하세요!</div>
          </div>
          <ExternalServiceLinkButton url={contents.notionUrl}>
            {getModuleIcon(NOTION_MODULE_VALUE)}
            <div>노션에서 보기</div>
          </ExternalServiceLinkButton>
        </>
      ) : (
        <Button variant="outline" className="mt-2">
          노션 링크를 등록하지 않은 모듈입니다.
        </Button>
      )}
    </div>
  );
}

export { NotionModuleContent };
