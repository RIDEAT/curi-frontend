import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import UserAPI from "../../../lib/api/user";
import getAccessToken from "../../../lib/utils/getAccessToken";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import {
  isAuthenticatedAtom,
  authTokenAtom,
  userAtom,
} from "../../../lib/context/auth";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "ui";
import Link from "next/link";

const LoginFormSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식이어야 합니다.",
  }),
  password: z.string().min(8, {
    message: "비밀번호는 8글자 이상이어야 합니다.",
  }),
});

export default function LoginForm({ nextRoute }: { nextRoute: string }) {
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setUser = useSetAtom(userAtom);

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  const login = async (email: string, password: string) => {
    clearErrorMsg();

    try {
      const userCredential = await UserAPI.loginFirebase(email, password);
      const accessToken = await getAccessToken(userCredential);
      const { user, authToken } = await UserAPI.getTokens(accessToken);

      setIsAuthenticated(true);
      setAuthToken(authToken);
      setUser(user);

      router.replace(nextRoute);
    } catch (err) {
      err.message
        ? setErrorMsg(err.message)
        : setErrorMsg("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    await login(data.email, data.password);
    toast({
      title: "[Test] 로그인이 요청되었습니다.",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card className="w-2/3 max-w-screen-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          가입한 이메일 주소와 비밀번호를 입력해주세요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example@curi.work" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-2 text-red-500 text-xs">
              <p>{errorMsg}</p>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
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
