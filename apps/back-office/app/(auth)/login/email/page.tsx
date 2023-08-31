import LoginForm from "./components/login-form";

export default function EmailLogin() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <LoginForm nextRoute="/workspace" />
      </div>
    </>
  );
}
