"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "ui";
import Link from "next/link";
import RouterNav from "../../components/navigations/RouterNav";

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-2">
        <RouterNav />
      </div>
      <div>{children}</div>
    </div>
  );
}
