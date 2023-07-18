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
import {
  employeeSchema,
  managerSchemaType,
  managerSchema,
} from "./schemas/memberSchema";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";
import { MemberAPI } from "../../../lib/api/member";
import { MemberFormType } from "member-types";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { formatDate } from "../../../lib/utils/formatDate";

export function CreateManagerForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<managerSchemaType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      department: "",
    },
  });

  const onSubmit = async (data: managerSchemaType) => {
    setIsLoading(true);
    try {
      const managerFormData = {
        wid: Number(currentWorkspaceId),
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        department: data.department,
      } as MemberFormType;

      const { response, result } = await MemberAPI.create(managerFormData);
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
              추가하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
