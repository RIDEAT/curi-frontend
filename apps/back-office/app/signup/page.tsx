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
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase/firebaseClient";
import { useRouter } from "next/navigation";

function RegisterForm({
  setSentEmail,
}: {
  setSentEmail: (value: boolean) => void;
}) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("　");

  const register = async () => {
    try {
      setErrorMsg("　");
      const actionCodeSettings = {
        url: "http://localhost:3000/login",
      };
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      await sendEmailVerification(user, actionCodeSettings);
      setRegisterEmail("");
      setRegisterPassword("");
      setSentEmail(true);
    } catch (err) {
      console.log(err.code);
      switch (err.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value);
  };

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
    </div>
  );
}

function VerifyEmail() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("　");

  const handleVerifyEmail = () => {
    firebaseAuth.currentUser
      .reload()
      .then(() => {
        const isVerified = firebaseAuth.currentUser.emailVerified;
        console.log(isVerified);
        console.log(firebaseAuth.currentUser);
        if (isVerified) {
          router.push("/login");
        } else {
          setErrorMsg("이메일 인증을 완료해주세요");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-1/2 max-w-screen-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            이메일 인증 후, 인증 완료 버튼을 눌러주세요.
          </CardDescription>
          <div className="grid gap-2 text-red-500 text-xs">
            <p>{errorMsg}</p>
          </div>
        </CardHeader>

        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={handleVerifyEmail}>
            인증 완료
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  const [sentEmail, setSentEmail] = useState(false);
  const router = useRouter();
  //   useEffect(() => {
  //     const user = firebaseAuth.currentUser;
  //     if (user) {
  //       const isVerified = user.emailVerified;
  //       if (isVerified) {
  //         router.push("/login");
  //       }
  //     }
  //   });

  return sentEmail ? (
    <VerifyEmail />
  ) : (
    <RegisterForm setSentEmail={setSentEmail} />
  );
}
