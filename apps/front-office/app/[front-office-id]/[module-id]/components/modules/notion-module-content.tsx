import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, LoadingCircle, NOTION_MODULE_VALUE, getModuleIcon } from "ui";
import { ExternalServiceLinkButton } from "./external-service-link-button";

function NotionModuleContent({ contents }) {
  return (
    <div>
      <div className="flex flex-col text-base font-medium">
        <div>노션으로 작성된 문서입니다.</div>
        <div>아래버튼을 눌러, 노션에서 확인하세요!</div>
      </div>
      {contents.notionUrl ? (
        <ExternalServiceLinkButton url={contents.notionUrl}>
          {getModuleIcon(NOTION_MODULE_VALUE)}
          <div>노션에서 보기</div>
        </ExternalServiceLinkButton>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { NotionModuleContent };
