"use client";

import Link from "next/link";
import { Button } from "ui";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-10">
      <h2>에러가 발생했습니다.</h2>
      <Button onClick={() => reset()}>
        <Link href="/" passHref>
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  );
}
