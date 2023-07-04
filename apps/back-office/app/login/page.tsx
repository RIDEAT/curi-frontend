"use client";

import { useState } from "react";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase/firebaseClient";
import LoginForm from "./LoginForm";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("　");

  const login = async () => {
    try {
      setErrorMsg("　");
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      console.log("로그인 성공:", user);
      const accessToken = await user.getIdToken();
      const response = await fetch("http://localhost:8080/user/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: accessToken,
        },
      });
      console.dir(response);
      console.log(response.headers.get("Authorization"));
      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      console.error(err);
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
        default:
          setErrorMsg("로그인이 실패했습니다.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        errorMsg={errorMsg}
        login={login}
      />
    </div>
  );
}

export default function LoginPage() {
  return <Login />;
}
