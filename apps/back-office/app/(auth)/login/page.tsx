"use client";

import LoginForm from "./email/components/login-form";
import withAuth from "../../../components/hoc/withAuth";
import { useRouter } from "next/navigation";
import { GOOGLE_OAUTH_URL } from "../../../lib/constant/url";
import { Button, GoogleIcon } from "ui";
import { MailIcon } from "lucide-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function Login() {
  const router = useRouter();

  const redirectToEmailRegister = () => {
    router.push("/login/email");
  };

  const redirectToWithoutPwRegister = () => {
    router.push("/login/without-pw");
  };

  return (
    <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1
          className={`text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400`}
        >
          동료와 연결되는 새로운 방식
        </h1>
        <h1 className={`text-xl md:text-3xl font-bold text-black`}>Workplug</h1>
      </div>
      <div className="w-full max-w-[250px] md:max-w-[400px] flex flex-col gap-3 mt-5">
        <Button
          variant="outline"
          className="flex justify-between items-center p-5"
          onClick={redirectToEmailRegister}
        >
          <div className="flex justify-start gap-2 items-center">
            <MailIcon className="w-6 h-6 text-stone-500" />
            <div className="text-sm font-semibold text-stone-600 ml-2">
              이메일로 로그인
            </div>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-500" />
        </Button>

        <Link href={GOOGLE_OAUTH_URL} className="w-full">
          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-5"
          >
            <div className="flex justify-start gap-2 items-center">
              <GoogleIcon />
              <div className="text-sm font-semibold text-stone-600 ml-2">
                구글 계정으로 로그인
              </div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-stone-500" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(LoginPage, "auth");
function LoginPage() {
  return <Login />;
}
