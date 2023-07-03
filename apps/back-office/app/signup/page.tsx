"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase/firebaseClient";
import { useRouter } from "next/navigation";
import RegisterForm from "./RegisterForm";
import VerifyForm from "./VerifyForm";

function Register({
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
      <VerifyForm handleVerifyEmail={handleVerifyEmail} errorMsg={errorMsg} />
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

  return sentEmail ? <VerifyEmail /> : <Register setSentEmail={setSentEmail} />;
}
