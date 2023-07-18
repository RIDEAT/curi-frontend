import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui";
import { FirebaseAPI } from "../../lib/api/firebase";
import { useEffect, useState } from "react";

export interface RegisterVerifyCardProps {
  errorMsg: string;
  handleVerifyEmail: () => void;
}

export default function RegisterVerifyCard({
  errorMsg,
  handleVerifyEmail,
}: RegisterVerifyCardProps) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    FirebaseAPI.getUserEmail().then((email) => {
      setEmail(email);
    });
  }, []);

  return (
    <Card className="w-1/2 max-w-screen-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">이메일 인증</CardTitle>
        <CardDescription>
          이메일 인증 후, 인증 완료 버튼을 눌러주세요.
        </CardDescription>
        <CardDescription>{email}로 인증메일을 보냈습니다.</CardDescription>
        <div className="grid gap-2 text-red-500 text-xs">
          <p>{errorMsg}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleVerifyEmail}>
          인증 완료
        </Button>
      </CardFooter>
    </Card>
  );
}
