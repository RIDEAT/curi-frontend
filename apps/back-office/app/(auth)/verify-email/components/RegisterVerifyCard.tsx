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

import { FirebaseAPI } from "../../../../lib/api/firebase";
import { useRouter } from "next/navigation";
import getAccessToken from "../../../../lib/utils/getAccessToken";
import { UserAPI } from "../../../../lib/api/user";
import { AuthAPI } from "../../../../lib/api/auth";

export function RegisterVerifyCard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    const user = await FirebaseAPI.getCurrentUser();
    const isVerified = await FirebaseAPI.checkEmailVerification();
    const email = await FirebaseAPI.getUserEmail();
    const name = await FirebaseAPI.getUserName();
    const accessToken = await getAccessToken(user);

    if (isVerified) {
      if (!email) {
        setErrorMsg("이메일을 찾을 수 없습니다");
        return;
      }
      const isGetTokens = await AuthAPI.getTokensForFirebase(accessToken);

      if (!isGetTokens) {
        throw new Error("토큰을 받아오지 못했습니다.");
      }

      const isRegistered = await UserAPI.register(email);

      if (!isRegistered) {
        setErrorMsg("유저 등록에 실패했습니다.");
      }

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

  useEffect(() => {
    FirebaseAPI.getUserName().then((name) => {
      setName(name);
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
