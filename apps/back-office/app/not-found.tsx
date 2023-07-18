"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "ui";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <h2>Not Found</h2>
      <p>{pathname} 을 찾을 수 없습니다.</p>
      <p>
        <Button>
          <Link href="/" passHref>
            홈으로 돌아가기
          </Link>
        </Button>
      </p>
    </div>
  );
}
