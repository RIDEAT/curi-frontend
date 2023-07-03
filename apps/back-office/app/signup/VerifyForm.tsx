import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "ui";

export interface VerifyFormProps {
  errorMsg: string;
  handleVerifyEmail: () => void;
}

export default function VerifyForm({
  errorMsg,
  handleVerifyEmail,
}: VerifyFormProps) {
  return (
    <Card className="w-1/2 max-w-screen-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>
          이메일 인증 후, 인증 완료 버튼을 눌러주세요.
        </CardDescription>
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
