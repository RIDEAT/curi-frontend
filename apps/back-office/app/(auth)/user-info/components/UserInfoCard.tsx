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

function TermsOfServiceHoverCard({
  title,
  descriptions,
}: {
  title: string;
  descriptions: string[];
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className=" text-gray-500">
          약관보기
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">{title}</h4>
            <Separator />
            {descriptions.map((description, index) => (
              <p className="text-sm" key={index}>
                {description}
              </p>
            ))}
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">2023-08-14</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

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
                      (필수) 뉴스레터 발송을 위한 개인정보를 수집·이용하는데
                      동의합니다.
                      <TermsOfServiceHoverCard
                        title="뉴스레터 발송을 위한 개인정보 수집·이용 동의서"
                        descriptions={[
                          "RIDEAT은 뉴스레터 발송을 위해 아래와 같이 개인정보를 수집∙이용하며, 동의하신 수신 방법에 대해서만 홍보∙마케팅 정보를 발송합니다.",
                          "-",
                          "※ 귀하는 개인정보 처리 위탁에 동의를 거부할 권리가 있으며, 동의를 거부할 경우 뉴스레터를 받아 보실 수 없습니다.",
                          "-",
                          "개인정보 수집‧이용 내역",
                          "필수항목 : 이메일(E-mail)",
                          "선택항목 : 이름",
                          "수집목적 : 뉴스레터 발송",
                          "보유기간 : 정보 주체의 동의 철회 시 까지",
                        ]}
                      />
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
