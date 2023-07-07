"use client";

import { useState, useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useRouter } from "next/navigation";

import LoginForm from "../../components/ui/forms/LoginForm";
import UserAPI from "../../lib/api/user";
import getAccessToken from "../../lib/utils/getAccessToken";
import {
  isAuthenticatedAtom,
  authTokenAtom,
  userAtom,
} from "../../lib/context/auth";
import withAuth from "../../components/hoc/withAuth";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [IsAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setUser = useSetAtom(userAtom);

  const router = useRouter();

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

      router.replace("/auth_test_page");
      setIsAuthenticated(true);
      setAuthToken(authToken);
      setUser(user);

      clearForm();
    } catch (err) {
      err.message
        ? setErrorMsg(err.message)
        : setErrorMsg("로그인에 실패했습니다. 다시 시도해주세요.");
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

export default withAuth(LoginPage, "auth");
function LoginPage() {
  return <Login />;
}
