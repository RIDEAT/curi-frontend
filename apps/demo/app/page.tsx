"use client";

import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "ui";

import { CuriExmapleLogo } from "../components/logos/curi-example-logo";
import { db } from "../lib/firebase/firebaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
      console.log(data, newData);
    });
  };

  useEffect(() => {
    getData();
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
            <div>
              <div>실시간 뉴스레터 구독자 : {} 명</div>
              <div>실시간 closed beta 신청자 : {} 명</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
