"use client";

import withAuth from "../../../components/hoc/withAuth";
import { GoogleAPI } from "../../../lib/api/google";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      await GoogleAPI.oauth(code);
    } catch (error) {}
    redirectToLogin();
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
