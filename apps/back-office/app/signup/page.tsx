"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui";
import { Input } from "ui";
import { Label } from "ui";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-1/2 max-w-screen-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            회사에서 사용하는 이메일 주소를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="example@email.com" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">계속하기</Button>
          <div className="text-sm my-3">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-blue-400">
              로그인
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
