"use client";

import withAuth from "../../../components/hoc/withAuth";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAPI } from "../../../lib/api/user";
import { AuthAPI } from "../../../lib/api/auth";

export default withAuth(GooglePage, "auth");
function GooglePage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return <Google code={code} />;
}

function Google({ code }: { code: string }) {
  const router = useRouter();
  const requestGoogleConnection = async () => {
    try {
      const result = await AuthAPI.getTokensForGoogle(code);
      await UserAPI.register(result.userEmail);
    } catch (error) {
      console.log(error);
    }
    router.push("/login");
  };

  useEffect(() => {
    if (code) {
      requestGoogleConnection();
    }
  }, [code]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center"></div>
    </>
  );
}
