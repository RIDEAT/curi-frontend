import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LoadingButton,
} from "ui";

import { FirebaseAPI } from "../../lib/api/firebase";
import { useRouter } from "next/navigation";
import getAccessToken from "../../lib/utils/getAccessToken";
import { UserAPI } from "../../lib/api/user";

export default function RegisterVerifyCard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    const user = await FirebaseAPI.getCurrentUser();
    const isVerified = await FirebaseAPI.checkEmailVerification();
    const email = await FirebaseAPI.getUserEmail();
    const accessToken = await getAccessToken(user);

    if (isVerified) {
      if (!email) {
        setErrorMsg("이메일을 찾을 수 없습니다");
        return;
      }
      UserAPI.register(email, accessToken);
      router.push("/login");
    } else {
      setErrorMsg("이메일 인증을 완료해주세요");
    }
    setIsLoading(false);
  };

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
        <CardDescription>
          {email || "이메일"}로 인증메일을 보냈습니다.
        </CardDescription>
        <div className="grid gap-2 text-red-500 text-xs">
          <p>{errorMsg}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col">
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button className="w-full" onClick={handleVerifyEmail}>
            인증 완료
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
