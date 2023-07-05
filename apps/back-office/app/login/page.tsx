"use client";

import { useEffect, useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import UserAPI from "../../lib/api/user";
import getAccessToken from "../../lib/utils/getAccessToken";
import { useAtom } from "jotai";
import { authStateAtom } from "../../lib/context/auth";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [authState, setAuthState] = useAtom(authStateAtom);

  const clearForm = () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  const login = async () => {
    clearErrorMsg();
    try {
      const userCredential = await UserAPI.loginFirebase(
        loginEmail,
        loginPassword
      );
      const accessToken = await getAccessToken(userCredential);
      const { user, authToken } = await UserAPI.getTokens(accessToken);
      setAuthState({ isAuthenticated: true, user, authToken });
    } catch (err) {
      if (err.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      clearForm();
    }
  };

  return (
    <>
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
    </>
  );
}

export default function LoginPage() {
  return <Login />;
}
