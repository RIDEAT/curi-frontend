"use client";

import { RegisterVerifyCard } from "./components/RegisterVerifyCard";
import withAuth from "../../../components/hoc/withAuth";

export default withAuth(VerifyEmail, "auth");
function VerifyEmail() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <RegisterVerifyCard />
    </div>
  );
}
