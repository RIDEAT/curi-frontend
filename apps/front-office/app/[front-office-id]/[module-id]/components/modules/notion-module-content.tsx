import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, LoadingCircle, NOTION_MODULE_VALUE, getModuleIcon } from "ui";

function NotionModuleContent({ contents }) {
  return (
    <div>
      <div className="flex flex-col text-base font-medium">
        <div>노션으로 작성된 문서입니다.</div>
        <div>아래버튼을 눌러, 노션에서 확인하세요!</div>
      </div>
      {contents.notionUrl ? (
        <Link href={contents?.notionUrl} target="_blank">
          <Button
            variant="outline"
            className="w-full mt-4 flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              {getModuleIcon(NOTION_MODULE_VALUE)}
              <div>노션에서 보기</div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-stone-500" />
          </Button>
        </Link>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

export { NotionModuleContent };
