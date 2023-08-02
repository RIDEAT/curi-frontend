"use client";

import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

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
  navigationMenuTriggerStyle,
} from "ui";

import { CuriExmapleLogo } from "../components/logos/curi-example-logo";
import { useEffect, useState } from "react";

export default function Home() {
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
    <>
      <div className="w-screen flex flex-col justify-center">
        <div className="flex justify-between my-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="ml-6">
                <NavigationMenuLink
                  aria-disabled
                  className={navigationMenuTriggerStyle()}
                >
                  <CuriExmapleLogo />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/workspace/workflow" className="mr-10">
                  <Button className="w-40 h-12 text-xl font-bold bg-violet-500 hover:bg-violet-700">
                    데모 체험하기
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <main className="h-[80vh] flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 mb-[100px] justify-center items-center">
              <h1 className="text-5xl font-bold">
                회사의 첫인상을 디자인합니다
              </h1>
              <h3 className="text-xl font-medium my-5">
                온보딩 과정에 필요한 모든 도구를 제공합니다
              </h3>
              <h3 className="text-xl font-medium mb-10">
                지금 바로 데모 버전을 마음껏 만져보세요
              </h3>
              <Link href="/workspace/workflow">
                <Button className="w-40 h-12 text-xl font-boldm bg-violet-500 hover:bg-violet-700">
                  데모 체험하기
                </Button>
              </Link>
            </div>
            <div className="flex justify-center gap-5">
              <SubscriptionCard
                title="뉴스레터 구독자"
                count={data.newletterCount}
              />
              <SubscriptionCard
                title="closed beta 신청자"
                count={data.reservationsCount}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function SubscriptionCard({ title, count }: { title: string; count: number }) {
  return (
    <Card className="w-64">
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
          +{count == 0 ? "집계중" : count}
        </div>
      </CardContent>
    </Card>
  );
}
