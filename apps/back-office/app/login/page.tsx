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
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase/firebaseClient";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("　");

  const login = async () => {
    try {
      setErrorMsg("　");
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      console.log("로그인 성공:", user);
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      console.log(err.code);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMsg("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6글자 이상이어야 합니다.");
          break;
        case "auth/network-request-failed":
          setErrorMsg("네트워크 연결에 실패 하였습니다.");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 형식입니다.");
          break;
        case "auth/too-many-requests":
          setErrorMsg(
            "비밀번호를 너무 많이 틀렸습니다. 잠시 후 다시 시도해주세요."
          );
          break;
        case "auth/internal-error":
          setErrorMsg("잘못된 요청입니다.");
          break;
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-1/2 max-w-screen-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            가입한 이메일 주소와 비밀번호를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={loginEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={loginPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="grid gap-2 text-red-500 text-xs">
            <p>{errorMsg}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={login}>
            로그인
          </Button>
          <div className="text-sm my-3">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-blue-400">
              회원가입
            </Link>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
