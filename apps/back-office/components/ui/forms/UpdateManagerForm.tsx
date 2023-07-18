import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "ui";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { LoadingButton } from "ui";
import { managerSchema, managerSchemaType } from "./schemas/memberSchema";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";
import { IMember } from "member-types";
import { Row } from "@tanstack/react-table";

export function UpdateManagerForm({
  manager,
  setOpen,
}: {
  manager: IMember;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<managerSchemaType>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      name: manager.name,
      email: manager.email,
      phoneNumber: manager.phoneNumber,
      department: manager.department,
    },
  });

  const onSubmit = async (data: managerSchemaType) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/member", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          department: data.department,
        }),
      });

      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-md space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">이름</FormLabel>
              <FormControl>
                <Input placeholder="ex. 홍길동" {...field} />
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
              <FormDescription className="text-xs">
                멤버가 큐리 시스템에게 연락받을 이메일입니다.
              </FormDescription>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="ex. example@example.com" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                전화번호
              </FormLabel>
              <FormDescription className="text-xs">
                멤버가 큐리 시스템에게 연락받을 전화번호입니다.
              </FormDescription>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="ex. 010-3333-3333" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">부서</FormLabel>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="ex. 개발팀" {...field} />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full">
              수정하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
