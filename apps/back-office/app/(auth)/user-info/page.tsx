"use client";

import UserInfoCard from "./components/UserInfoCard";
import withAuth from "../../../components/hoc/withAuth";

export default withAuth(EnterUserInfo, "protected");
function EnterUserInfo() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <UserInfoCard nextRoute="/workspace" />
    </div>
  );
}
