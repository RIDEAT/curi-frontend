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
} from "ui";

import { cn } from "ui/lib/utils";
import { CuriExmapleLogo } from "../components/logos/curi-example-logo";
import main_ui from "../public/main_ui.png";
import workflow_sm from "../public/workflow_sm.png";
import dashboard_sm from "../public/dashboard_sm.png";

const backgroundStyle = "bg-gradient-to-br from-white to-violet-300";

export default function Home() {
  return (
    <>
      <div className={cn("flex flex-col justify-center", backgroundStyle)}>
        <LandingNavigation />
        <main className="flex justify-start items-start">
          <div className="h-[200vh] flex flex-col gap-2 mr-10">
            <div className="flex justify-between mt-12 md:mt-32 ml-4 sm:ml-8 md:ml-12">
              <LandingHero />
            </div>
            <div className="flex flex-col gap-10">
              <div className="hidden sm:block ml-7">
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
              <div className="flex gap-5 sm:hidden mt-5 ml-3 overflow-scroll scrollbar-hide">
                <Image
                  alt="Curi Board UI"
                  src={workflow_sm}
                  width={1007}
                  height={733}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  quality={100}
                />
                <Image
                  alt="Curi Board UI"
                  src={dashboard_sm}
                  width={1085}
                  height={681}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  quality={100}
                />
              </div>
              <SubscriptionInfo />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const textGradientStyle =
  "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400";

function LandingHero() {
  return (
    <div className="flex flex-col justify-start items-start ">
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold flex flex-col gap-2",
          textGradientStyle
        )}
      >
        <p className="hidden sm:block">회사의 첫인상을 디자인합니다</p>
        <p className="sm:hidden">회사의 첫인상을</p>
        <p className="sm:hidden">디자인합니다</p>
      </h1>
      <h3 className="text-stone-700 text-sm sm:text-base md:text-lg font-semibold my-5 md:mb-10">
        <p>온보딩에 필요한 모든 도구를 제공합니다</p>
        {/* <p>지금 바로 데모 버전을 마음껏 체험하세요</p> */}
      </h3>
      <DemoLinkButton />
    </div>
  );
}

function LandingNavigation() {
  return (
    <div className="flex justify-between my-6">
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

function DemoLinkButton({ className }: { className?: string }) {
  return (
    <Link
      href="/workspace/workflow"
      className={cn("mr-6 sm:mr-10 md:mr-20", className)}
    >
      <Button className="w-28 h-10 text-sm md:w-40 md:h-12 md:text-xl font-bold bg-violet-500 hover:bg-violet-700">
        체험하기
      </Button>
    </Link>
  );
}

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
    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
      <SubscriptionCard title="뉴스레터 구독자" count={data.newletterCount} />
      <SubscriptionCard
        title="closed beta 신청자"
        count={data.reservationsCount}
      />
    </div>
  );
}

function SubscriptionCard({ title, count }: { title: string; count: number }) {
  return (
    <Card className="w-1/2 min-w-[220px] md:w-64 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
        <div className="text-2xl font-bold">
          {count == 0 ? "집계중" : `+ ${count}`}
        </div>
      </CardContent>
    </Card>
  );
}
