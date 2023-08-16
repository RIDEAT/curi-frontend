"use client";

import RegisterForm from "../../../components/auth/form/RegisterForm";
import withAuth from "../../../components/hoc/withAuth";

function Register() {
  return (
    <>
      <div className="h-screen w-screen min-w-[450px] flex justify-center items-start mt-5">
        <RegisterForm />
      </div>
    </>
  );
}

export default withAuth(SignupPage, "auth");
function SignupPage() {
  return <Register />;
}
