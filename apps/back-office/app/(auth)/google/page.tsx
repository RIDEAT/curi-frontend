"use client";

import withAuth from "../../../components/hoc/withAuth";
import { GoogleAPI } from "../../../lib/api/google";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAPI } from "../../../lib/api/user";

export default withAuth(GooglePage, "protected");
function GooglePage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return <Google code={code} />;
}

function Google({ code }: { code: string }) {
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace(`/login`);
  };

  const requestGoogleConnection = async () => {
    try {
      const result = await GoogleAPI.oauth(code);
      // await UserAPI.register(result.email)
      console.log(result.email);
    } catch (error) {}
    //redirectToLogin();
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
