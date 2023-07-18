"use client";

import { Button } from "ui";
import LendingNav from "../components/ui/navigations/LendingNav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center">
        <LendingNav />
        <main className="flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <Link href="/create-workspace">
              <Button>워크스페이스 생성하기</Button>
            </Link>
            <Link href="/workspace">
              <Button>워크스페이스로 이동하기</Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
