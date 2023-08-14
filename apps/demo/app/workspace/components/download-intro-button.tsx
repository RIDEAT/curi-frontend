import Link from "next/link";
import { Button } from "ui";

function DownloadIntroButton() {
  return (
    <Link href="/reservation" target="_blank" className="w-full ">
      <div className="w-full shadow-xl">
        <Button
          variant="outline"
          className="w-full border border-violet-600 text-sm"
        >
          <p className="font-semibold">5초만에 제품 설명서 받기</p>
        </Button>
      </div>
    </Link>
  );
}

export { DownloadIntroButton };
