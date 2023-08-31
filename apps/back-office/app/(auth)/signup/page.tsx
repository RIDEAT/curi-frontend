"use client";

import RegisterForm from "./components/RegisterForm";
import withAuth from "../../../components/hoc/withAuth";
import { Card, CardHeader } from "ui";

function Register() {
  return (
    <>
      <div className="h-screen w-screen min-w-[450px] flex justify-center items-start mt-5">
        <RegisterForm />
      </div>
    </>
  );
}

function RegisterSelect() {
  return (
    <div>
      <div className="h-screen w-screen min-w-[450px] flex justify-center items-start mt-5">
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">이메일로 회원가입</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">구글 계정으로 회원가입</div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(SignupPage, "auth");
function SignupPage() {
  return <RegisterSelect />;
}
