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
import { memberSchema } from "./schemas/memberSchema";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";

export function CreateMemberForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      startDate: new Date(),
      role: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof memberSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          startDate: data.startDate,
          role: data.role,
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
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">입사일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={false}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription className="text-xs">
                입사(예정)일을 선택해주세요.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">구분</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="역할을 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="manager">매니저</SelectItem>
                  <SelectItem value="employee">신입사원</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full">
              추가하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
