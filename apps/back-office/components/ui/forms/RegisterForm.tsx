import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

import UserAPI from "../../../lib/api/user";
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

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "2글자 이상이어야 합니다.",
    })
    .max(20, {
      message: "20글자 이하여야 합니다.",
    })
    .regex(/^[^\s!@#$%^&*()<>?]+$/, {
      message: "공백과 특수문자를 허용하지 않습니다.",
    }),
  email: z.string().email({
    message: "올바른 이메일 형식이어야 합니다.",
  }),
  password: z.string().min(8, {
    message: "비밀번호는 8글자 이상이어야 합니다.",
  }),
  password2: z.string().min(8, {
    message: "비밀번호는 8글자 이상이어야 합니다.",
  }),
});

export default function RegisterForm({
  setSentEmail,
}: {
  setSentEmail: (value: boolean) => void;
}) {
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const register = async (email: string, password: string) => {
    setErrorMsg("");
    try {
      await UserAPI.registerFirebase(email, password);
      setSentEmail(true);
    } catch (err) {
      if (err.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    await register(data.email, data.password);
    toast({
      title: "[Test] 회원가입이 요청되었습니다.",
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
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>
          회원가입에 필요한 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="회사에서 사용하는 이메일 주소를 입력해주세요."
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="사용할 비밀번호를 입력해주세요. (8글자 이상)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="비밀번호를 확인해주세요."
                      {...field}
                    />
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
                회원가입
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm my-3">
          이미 계정이 있으신가요?
          <Link href="/login" className="text-blue-400">
            로그인
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
