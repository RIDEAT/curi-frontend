"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Separator,
} from "ui";

import { cn } from "ui/lib/utils";
import { CuriExmapleLogo } from "../components/logos/curi-example-logo";
import main_ui from "../public/main_ui.png";
import editor_main from "../public/editor_main.png";

const backgroundStyle1 = "bg-gradient-to-br from-white to-violet-300";
const backgroundStyle2 = "bg-gradient-to-br from-white to-blue-200";

export default function Home() {
  return (
    <>
      <main>
        <div className={cn("flex flex-col justify-center")}>
          <div
            className={cn(
              "justify-start items-start flex flex-col gap-2 pb-10 pl-6 sm:pl-0",
              backgroundStyle1
            )}
          >
            <LandingNavigation />
            <div className="flex justify-between mt-6 md:mt-20 ml-4 sm:ml-8 md:ml-12 mr-10">
              <LandingHero />
            </div>
            <div className="flex flex-col gap-10 ml-3 sm:ml-7 mr-10">
              <div className="mt-8 sm:mt-0 ">
                <Image
                  alt="Curi Board UI"
                  src={main_ui}
                  width={1814}
                  height={922}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  quality={100}
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              "justify-start items-start flex flex-col gap-2 pb-10 pt-10 pl-10",
              backgroundStyle2
            )}
          >
            <EditorIntroduction />
          </div>
          {/* <div className={cn("flex flex-col gap-2")}>
            <SubscriptionInfo />
          </div> */}
          <div className="px-3 mb-5 flex flex-col items-start ml-10 mr-10 pt-5">
            <Separator />
            <div className="text-stone-400 text-sm mt-5">© 2023 RIDEAT.</div>
            <div className="text-stone-400 text-sm mt-5">대표자 | 강민혁</div>
            <div className="text-stone-400 text-sm mt-2">
              email : curi_help@curiboard.com
            </div>
            <div className="text-stone-400 text-sm">phone : 010-3303-6681</div>
          </div>
        </div>
      </main>
    </>
  );
}

function LandingNavigation() {
  return (
    <div className="w-full flex justify-between my-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="ml-4 sm:ml-8 md:ml-12">
            <NavigationMenuLink aria-disabled>
              <CuriExmapleLogo size="lg" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <DemoLinkButton />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const textGradientStyle = `font-extrabold text-transparent bg-clip-text bg-gradient-to-r`;

function LandingHero() {
  return (
    <div className="flex flex-col justify-start items-start ">
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold flex flex-col gap-2",
          textGradientStyle,
          "from-violet-600 to-purple-400"
        )}
      >
        <p className="hidden sm:block">회사의 첫인상을 디자인합니다</p>
        <p className="sm:hidden">회사의 첫인상을</p>
        <p className="sm:hidden">디자인합니다</p>
      </h1>
      <h3 className="text-stone-700 text-sm sm:text-base md:text-lg font-semibold my-5 md:mb-10">
        <p>온보딩에 필요한 모든 도구를 제공합니다</p>
      </h3>
      <DemoLinkButton />
    </div>
  );
}

function DemoLinkButton({
  title = "무료로 시작하기",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <Link href="/workspace/workflow" className={"mr-6 sm:mr-10 md:mr-20"}>
      <Button
        className={cn(
          "w-32 h-10 text-sm md:w-40 md:h-12 md:text-base font-bold bg-violet-500 hover:bg-violet-700 shadow-xl",
          className
        )}
      >
        {title}
      </Button>
    </Link>
  );
}

function EditorIntroduction() {
  return (
    <div className="flex flex-col justify-start items-start ">
      <h1
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold flex flex-col gap-2",
          textGradientStyle,
          "from-blue-500 to-blue-300"
        )}
      >
        <p className="hidden sm:block">온보딩 컨텐츠를 쉽게 제작하세요</p>
        <p className="sm:hidden">온보딩 컨텐츠를</p>
        <p className="sm:hidden">쉽게 제작하세요</p>
      </h1>
      <h3 className="text-stone-700 text-sm sm:text-base md:text-lg font-semibold my-5 md:mb-10">
        <p>AI 어시스턴트를 활용하여 컨텐츠를 빠르게 제작하세요</p>
      </h3>
      <DemoLinkButton
        className="bg-blue-500 hover:bg-blue-700"
        title="AI 사용해보기"
      />
      <div className="mt-5">
        <Image
          alt="Curi Board UI"
          src={editor_main}
          width={1365}
          height={814}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          quality={100}
        />
      </div>
    </div>
  );
}

/*
function SubscriptionInfo() {
  const [data, setData] = useState({
    reservationsCount: 0,
    newletterCount: 0,
  });

  const getReservationsInfo = async () => {
    return await fetch("/api/reservation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    getReservationsInfo().then((response) => {
      response.json().then((result) => {
        setData(result.data);
      });
    });
  }, []);
  return (
    <div className="flex flex-row justify-center items-center gap-5 p-5">
      <SubscriptionCard title="뉴스레터" count={data.newletterCount} />
      <SubscriptionCard title="closed beta" count={data.reservationsCount} />
    </div>
  );
}

function SubscriptionCard({ title, count }: { title: string; count: number }) {
  return (
    <Card className="w-1/2 min-w-[100px] md:w-64 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm sm:text-base md:text-lg font-medium">
          {title}
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-sm sm:text-lg md:text-xl font-bold">
          {count == 0 ? "집계중" : `+ ${count}`}
        </div>
      </CardContent>
    </Card>
  );
}
*/
