"use client";

import { usePathname } from "next/navigation";
import RouterNav from "../../components/ui/navigations/RouterNav";

const pathMapper = {
  "/login": {
    path: "/signup",
    display: "회원가입",
  },
  "/signup": { path: "/login", display: "로그인" },
  "/logout": { path: "/login", display: "로그인" },
};

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <RouterNav
          right={
            pathMapper[pathname]
              ? {
                  path: pathMapper[pathname].path,
                  display: pathMapper[pathname].display,
                }
              : null
          }
        />
      </div>
      <div>{children}</div>{" "}
    </div>
  );
}
