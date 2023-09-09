"use client";

import { useEffect, useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  GoogleIcon,
  Input,
  LoadingButton,
  Checkbox,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Separator,
} from "ui";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Car } from "lucide-react";
import { useCurrentUser } from "../../../../lib/hook/swr/useCurrentUser";
import { UserAPI } from "../../../../lib/api/user";

const UserFormSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 2글자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "올바른 이메일 형식이어야 합니다.",
  }),
  phoneNum: z.string().min(10, {
    message: "전화번호는 10글자 이상이어야 합니다.",
  }),
  company: z.string().min(2, {
    message: "회사명은 2글자 이상이어야 합니다.",
  }),
  required_agreement: z.boolean(),
});

export default function UserInfoCard({ nextRoute }: { nextRoute: string }) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const [isRequesting, setIsRequesting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isReseted, setIsReseted] = useState(false);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),

    defaultValues: {
      email: currentUser.currentUser?.email || "",
      name: currentUser.currentUser?.name || "",
      phoneNum: "",
      company: "",
      required_agreement: false,
    },
  });

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  const onSubmit = async (data: z.infer<typeof UserFormSchema>) => {
    setIsRequesting(true);
    clearErrorMsg();

    try {
      await UserAPI.updateUser(data.name, data.phoneNum, data.company);

      router.replace(nextRoute);
    } catch (err) {
      err.message
        ? setErrorMsg(err.message)
        : setErrorMsg("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (currentUser.currentUser && !isReseted) {
      form.reset({
        email: currentUser.currentUser.userId,
        name: currentUser.currentUser.name,
        // phoneNum: "",
        // company: "",
        // required_agreement: false,
      });
      setIsReseted(true);
    }
  }, [currentUser]);

  return (
    <Card className="w-2/3 max-w-screen-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">추가 정보</CardTitle>
        <CardDescription>
          추가 정보를 제공해주시고 이용 약관에 동의해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
                    이메일
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} disabled={true} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    전화번호
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="010-1234-5678" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    회사명
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
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
                      <Link href={"/legal/terms-and-conditions"}>
                        <Button variant="link" className=" text-gray-500">
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
              {isRequesting ? (
                <LoadingButton />
              ) : (
                <Button type="submit" className="w-full">
                  워크플러그 진행하기
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
