"use client";

import RouterNav from "../../components/ui/navigations/RouterNav";

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <RouterNav right={{ path: "/login", display: "로그인" }} />
      </div>
      <div>{children}</div>{" "}
    </div>
  );
}
