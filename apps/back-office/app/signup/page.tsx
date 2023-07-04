"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase/firebaseClient";
import { useRouter } from "next/navigation";
import RegisterForm from "../../components/forms/RegisterForm";
import VerifyForm from "../../components/cards/RegisterVerifyCard";
import UserAPI from "../../lib/api/user";

function Register({
  setSentEmail,
}: {
  setSentEmail: (value: boolean) => void;
}) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clearForm = () => {
    setRegisterEmail("");
    setRegisterPassword("");
  };

  const register = async () => {
    setErrorMsg("");
    try {
      await UserAPI.registerFirebase(registerEmail, registerPassword);
      setSentEmail(true);
    } catch (err) {
      if (err.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      clearForm();
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <RegisterForm
          register={register}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          errorMsg={errorMsg}
        />
      </div>
    </>
  );
}

function VerifyEmail() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerifyEmail = async () => {
    const isVerified = await UserAPI.checkEmailverification();

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

export default function SignupPage() {
  const [sentEmail, setSentEmail] = useState(false);

  return sentEmail ? <VerifyEmail /> : <Register setSentEmail={setSentEmail} />;
}
