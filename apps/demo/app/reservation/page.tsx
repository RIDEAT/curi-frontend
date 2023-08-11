"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from "ui";
import { redirect, useRouter } from "next/navigation";
import LoadingCircle from "../workspace/workflow/components/ui/icons/loading-circle";

export default function Reservation() {
  return <EmailForm />;
}

const emailSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식이 아닙니다.",
  }),
});

function EmailForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    const response = await fetch("/api/reservation/intro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.replace("/reservation/done");
  }

  return (
    <div className="gap-2 w-full h-[90vh] flex justify-center items-center p-4">
      <Card className="w-full md:w-[350px]">
        <CardHeader>
          <CardTitle>제품 소개서 받아보기</CardTitle>
          <CardDescription>3초만에 제품 소개서를 받아보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormLabel className="flex gap-1">
                      <p>이메일</p>
                      <p className="text-red-500">*</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-700"
              >
                {!isLoading ? "제품 소개서 다운받기" : <LoadingCircle />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function SimpleEmailSubscription() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2 w-full sm:w-1/2 max-w-sm justify-start items-start p-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-sm w-full"
            >
              이메일 구독하기
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[85vh] mt-10 sm:mt-0 overflow-scroll w-full sm:h-fit sm:w-[800px]">
            <EmailForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
