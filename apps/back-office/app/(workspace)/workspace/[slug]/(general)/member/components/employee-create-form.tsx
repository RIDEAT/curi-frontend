import { z } from "zod";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useState } from "react";
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
  LoadingButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  pushFailToast,
  pushSuccessToast,
} from "ui";
import {
  employeeEmailSchema,
  employeeNameSchema,
  employeeStartDateSchema,
} from "../../../../../../../lib/form-schemas/employee";
import { MemberAPI } from "../../../../../../../lib/api/member";
import { useEmployees } from "../../../../../../../lib/hook/swr/useMembers";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

const employeeCreateFormSchema = z.object({
  name: employeeNameSchema,
  email: employeeEmailSchema,
  startDate: employeeStartDateSchema,
});

type employeeCreateFormValues = z.infer<typeof employeeCreateFormSchema>;

function EmployeeCreateForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employeeMutate } = useEmployees();
  const [requesting, setRequesting] = useState(false);
  const form = useForm<employeeCreateFormValues>({
    resolver: zodResolver(employeeCreateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      startDate: new Date(),
    },
  });

  const onSubmit = async (data) => {
    try {
      setRequesting(true);
      await MemberAPI.createEmployee(currentWorkspaceId, {
        name: data.name,
        email: data.email,
        startDate: data.startDate,
      });
      await employeeMutate();
      pushSuccessToast(
        "신규 입사자 추가 완료",
        "신규 입사자가 추가되었습니다."
      );
      setOpen(false);
      setRequesting(false);
    } catch (error) {
      pushFailToast("신규 입사자 추가 실패", "다시 시도해주세요.");
      setOpen(false);
      setRequesting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>워크플로우 명</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          {!requesting ? (
            <Button type="submit">생성하기</Button>
          ) : (
            <LoadingButton />
          )}
        </div>
      </form>
    </Form>
  );
}

export { EmployeeCreateForm };
