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
    const isLogouted = await FirebaseAPI.logout();
    const response = await AuthAPI.logout();

    console.log("isLogouted", isLogouted);
    console.log("response", response);
  };

  useEffect(() => {
    if (localStore.getAuthToken()) {
      logout();
    }
    router.replace("/");
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
