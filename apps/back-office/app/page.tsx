"use client";

import { Button } from "ui";
import LendingNav from "../components/navigations/LendingNav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center">
        <LendingNav />
        <main className="flex justify-center items-center">
          <div className="flex flex-col">
            <Button>
              <Link href="/create-workspace">워크스페이스 생성하기</Link>
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
