"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingButton,
  Checkbox,
} from "ui";

import { FirebaseAPI } from "../../../../../lib/api/firebase";

const RegisterFormSchema = z
  .object({
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
    required_agreement: z.boolean().refine((value) => value, {
      message: "필수 약관에 동의해야 합니다.",
      path: ["required_agreement"],
    }),
  })
  .refine(
    (data) => {
      return data.password === data.password2;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["password2"],
    }
  );

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
      required_agreement: true,
    },
  });

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await FirebaseAPI.register(email, password, username);
      router.push("/verify-email");
    } catch (err) {
      if (err.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    await register(data.email, data.password, data.username);
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
                  <FormLabel className="text-base font-semibold">
                    이름
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    이메일 주소
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    사용할 비밀번호를 입력해주세요. (8글자 이상)
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    비밀번호를 확인해주세요.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required_agreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-2 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange as any}
                    />
                  </FormControl>
                  <div>
                    <FormLabel>
                      (필수) 개인정보를 수집·이용하는데 동의합니다.
                      <Link
                        href="https://www.workplug.team/legal/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            "https://www.workplug.team/legal/terms-and-conditions"
                          );
                        }}
                      >
                        <Button variant="link" className="text-gray-500">
                          약관보기
                        </Button>
                      </Link>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="grid gap-2 text-destructive text-xs">
              <p>{errorMsg}</p>
            </div>
            <div className="flex justify-center">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button type="submit" className="w-full">
                  회원가입
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm my-3">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-400">
            로그인
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
