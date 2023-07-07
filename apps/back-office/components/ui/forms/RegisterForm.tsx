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

export interface RegisterFormProps {
  registerEmail: string;
  registerPassword: string;
  errorMsg: string;
  setRegisterEmail: (value: string) => void;
  setRegisterPassword: (value: string) => void;
  register: () => void;
}

export default function RegisterForm({
  register,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  errorMsg,
}: RegisterFormProps) {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value);
  };

  return (
    <>
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
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={registerEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={registerPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-2 text-red-500 text-xs">
            <p>{errorMsg}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={register}>
            계속하기
          </Button>
          <div className="text-sm my-3">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-blue-400">
              로그인
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
