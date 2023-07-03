import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui";
import { Input } from "ui";
import { Label } from "ui";
import Link from "next/link";

export interface LoginFormProps {
  loginEmail: string;
  loginPassword: string;
  errorMsg: string;
  setLoginEmail: (value: string) => void;
  setLoginPassword: (value: string) => void;
  login: () => void;
}

export default function LoginForm({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  errorMsg,
  login,
}: LoginFormProps) {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  return (
    <Card className="w-1/2 max-w-screen-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          가입한 이메일 주소와 비밀번호를 입력해주세요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={loginEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={loginPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="grid gap-2 text-red-500 text-xs">
          <p>{errorMsg}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={login}>
          로그인
        </Button>
        <div className="text-sm my-3">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-blue-400">
            회원가입
          </Link>{" "}
        </div>
      </CardFooter>
    </Card>
  );
}
