"use client";

import RegisterForm from "../../components/ui/forms/RegisterForm";
import withAuth from "../../components/hoc/withAuth";

function Register() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <RegisterForm />
      </div>
    </>
  );
}

export default withAuth(SignupPage, "auth");
function SignupPage() {
  return <Register />;
}
