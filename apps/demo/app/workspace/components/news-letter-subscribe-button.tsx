import Link from "next/link";
import { Button } from "ui";

function NewsLetterSubscribeButton() {
  return (
    <Link
      href="https://page.stibee.com/subscriptions/274372"
      target="_blank"
      className="w-full shadow-xl"
    >
      <div className="w-full">
        <div className="flex justify-end">
          <span className="relative flex h-3 w-3 top-2 left-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
        <Button className="w-full bg-violet-500 hover:bg-violet-700 text-sm">
          <p>큐리 소식 받아보기</p>
        </Button>
      </div>
    </Link>
  );
}

export { NewsLetterSubscribeButton };
