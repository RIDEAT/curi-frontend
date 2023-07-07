"use client";

import LoginForm from "../../components/ui/forms/LoginForm";
import withAuth from "../../components/hoc/withAuth";

function Login() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <LoginForm nextRoute="/auth_test_page" />
      </div>
    </>
  );
}

export default withAuth(LoginPage, "auth");
function LoginPage() {
  return <Login />;
}
