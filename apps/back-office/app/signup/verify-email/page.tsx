"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import VerifyForm from "../../../components/auth/RegisterVerifyCard";
import withAuth from "../../../components/hoc/withAuth";
import { FirebaseAPI } from "../../../lib/api/firebase";
import { UserAPI } from "../../../lib/api/user";
import getAccessToken from "../../../lib/utils/getAccessToken";

export default withAuth(VerifyEmail, "auth");
function VerifyEmail() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerifyEmail = async () => {
    const user = await FirebaseAPI.getCurrentUser();
    const isVerified = await FirebaseAPI.checkEmailVerification();
    const email = await FirebaseAPI.getUserEmail();
    const accessToken = await getAccessToken(user);

    if (isVerified) {
      if (!email) {
        setErrorMsg("이메일을 찾을 수 없습니다");
        return;
      }
      UserAPI.register(email, accessToken);
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
