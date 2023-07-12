"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import RegisterForm from "../../components/ui/forms/RegisterForm";
import VerifyForm from "../../components/ui/cards/RegisterVerifyCard";
import withAuth from "../../components/hoc/withAuth";
import FirebaseAPI from "../../lib/api/firebase";

function Register({
  setSentEmail,
}: {
  setSentEmail: (value: boolean) => void;
}) {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <RegisterForm setSentEmail={setSentEmail} />
      </div>
    </>
  );
}

function VerifyEmail() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerifyEmail = async () => {
    const isVerified = await FirebaseAPI.checkEmailverification();

    if (isVerified) {
      router.push("/login");
    } else {
      setErrorMsg("이메일 인증을 완료해주세요");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <VerifyForm handleVerifyEmail={handleVerifyEmail} errorMsg={errorMsg} />
    </div>
  );
}

export default withAuth(SignupPage, "auth");
function SignupPage() {
  const [sentEmail, setSentEmail] = useState(false);

  return sentEmail ? <VerifyEmail /> : <Register setSentEmail={setSentEmail} />;
}
