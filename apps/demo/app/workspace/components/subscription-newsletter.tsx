"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Label,
  Separator,
  useToast,
} from "ui";
import Link from "next/link";
import { cn } from "ui/lib/utils";

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
        <Button variant="link" className="text-gray-500 h-0">
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

const formSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식이 아닙니다.",
  }),
  name: z.union([z.string(), z.undefined()]).optional(),
  phone_number: z.union([
    z
      .string()
      .regex(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/)
      .optional(),
    z.string(),
  ]),
  required_agreement: z
    .boolean()
    .default(true)
    .refine((value) => value, {
      message: "뉴스레터 수신 동의는 필수입니다.",
    }),
  optional_agreement: z.boolean().default(false).optional(),
  pre_reservation: z.boolean().default(false).optional(),
});

function SubscribeForm({
  emailDefault = "",
  setOpen,
}: {
  emailDefault?: string;
  setOpen: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailDefault,
      name: "",
      phone_number: "",
      required_agreement: true,
      optional_agreement: false,
      pre_reservation: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setOpen(false);
    const response = await fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        title: "❌ 신청에 실패하였습니다.",
        description: "잠시 후 다시 시도해주세요.",
      });
      return;
    }

    toast({
      title: "✅ 신청이 완료되었습니다.",
      description: `${data.email}로, 큐리의 새로운 소식을 받아보실 수 있습니다.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름 (선택)</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호 (선택)</FormLabel>
              <FormControl>
                <Input placeholder="ex. 010-1234-5678" {...field} />
              </FormControl>
              <FormMessage />
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
                      "선택항목 : 이름, 전화번호",
                      "수집목적 : 뉴스레터 발송",
                      "보유기간 : 정보 주체의 동의 철회 시 까지",
                    ]}
                  />
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optional_agreement"
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
                  (선택) 홍보·마케팅 활용을 위한 개인정보를 수집·이용하는데
                  동의합니다.
                  <TermsOfServiceHoverCard
                    title="홍보·마케팅 활용을 위한 개인정보 수집·이용 동의서"
                    descriptions={[
                      "RIDEAT은 HR SaaS 및 업계 동향, 관련 행사 및 제품 정보 발송 등을 위해 아래와 같이 개인정보를 수집∙이용하며, 동의하신 수신 방법에 대해서만 홍보∙마케팅 정보를 발송합니다.",
                      "-",
                      "※ 귀하는 개인정보 처리 위탁에 동의를 거부할 권리가 있으며, 동의를 거부할 경우 홍보 마케팅 정보를 받으실 수 없습니다.",
                      "-",
                      "개인정보 수집‧이용 내역",
                      "필수항목 : 이메일(E-mail)",
                      "선택항목 : 이름, 전화번호",
                      "수집목적 : HR SaaS 및 업계 동향, 관련 행사 및 제품 정보 발송 등 홍보‧마케팅 활용 목적",
                      "보유기간 : 정보 주체의 동의 철회 시 까지",
                    ]}
                  />
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pre_reservation"
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
                  (선택) 큐리의 closed beta 사전예약을 신청합니다. (9월 진행
                  예정)
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-700"
        >
          신청하기
        </Button>
      </form>
    </Form>
  );
}

export function SubscriptionNewsletter({
  simple = false,
}: {
  simple?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-2 w-full max-w-sm justify-start items-start p-4",
          simple && "p-0"
        )}
      >
        {!simple && (
          <Label className="flex flex-col gap-2 w-full">
            <span className="text-lg font-bold text-violet-600">
              큐리 소식 받아보기
            </span>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Label>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className={cn(
                "bg-violet-500 hover:bg-violet-700 text-sm",
                !simple && "w-full"
              )}
            >
              <p className="hidden sm:block">구독하기</p>
              <p className="sm:hidden">구독</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-screen overflow-scroll w-full sm:h-fit sm:w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-violet-600">
                큐리 소식 받아보기
              </DialogTitle>
              <DialogDescription className=" text-lg ">
                큐리의 새로운 소식을 받아보실 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <SubscribeForm emailDefault={email} setOpen={setOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
