"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "ui";
import { cn } from "ui/lib/utils";

import { localStore } from "../../../lib/utils/localStore";

export default function LendingNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStore.isAuthenticated());
  }, []);

  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-start ">
        <div className="flex justify-center items-center">
          <Link href="/" className="p-3 bg-yellow-400">
            workplug
          </Link>
        </div>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {isAuthenticated ? "마이페이지" : "로그인"}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/logout" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {"로그아웃"}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signup" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-blue-500",
                  "text-white",
                  "hover:bg-blue-600",
                  "hover:text-white"
                )}
              >
                무료로 시작하기
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
