"use client";

import { useEffect } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { FirebaseAPI } from "../../../lib/api/firebase";
import { AuthAPI } from "../../../lib/api/auth";
import { localStore } from "../../../lib/utils/localStore";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const logout = async () => {
    const isAuthLogouted = await AuthAPI.logout();
    router.replace("/login");
  };

  useEffect(() => {
    if (localStore.getAuthToken()) {
      logout();
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div>Logout</div>
      </div>
    </>
  );
}

export default withAuth(LogoutPage, "public");
function LogoutPage() {
  return <Logout />;
}
