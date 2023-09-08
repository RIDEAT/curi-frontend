"use client";

import RegisterForm from "./email/components/RegisterForm";
import withAuth from "../../../components/hoc/withAuth";
import { Button, Card, CardHeader, GoogleIcon } from "ui";
import { MailIcon } from "lucide-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { GOOGLE_OAUTH_URL } from "../../../lib/constant/url";
import Link from "next/link";

function RegisterSelect() {
  const router = useRouter();

  const redirectToEmailRegister = () => {
    router.push("/signup/email");
  };

  return (
    <div className="w-screen h-[90vh] flex flex-col justify-center items-center">
      <div className="flex justify-center gap-3">
        <h1
          className={`text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400`}
        >
          HR이 일하는 새로운 방식
        </h1>
        <h1 className={`text-xl md:text-3xl font-bold text-black`}>OnBird</h1>
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
              이메일로 회원가입
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
                구글 계정으로 회원가입
              </div>
            </div>
            <ArrowRightIcon className="w-4 h-4 text-stone-500" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withAuth(SignupPage, "auth");
function SignupPage() {
  return <RegisterSelect />;
}
