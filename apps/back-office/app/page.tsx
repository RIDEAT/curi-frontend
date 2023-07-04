"use client";

import LendingNav from "../components/navigations/LendingNav";

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center">
        <LendingNav />
        <main className="flex justify-center items-center">
          <div>main page</div>
        </main>
      </div>
    </>
  );
}
