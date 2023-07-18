import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, LoadingButton } from "ui";

import { IEmployee } from "member-types";
import { employeeSchema, employeeSchemaType } from "./memberSchema";
import { EmailField } from "./fields/EmailField";
import { NameField } from "./fields/NameField";
import { PhoneNumberField } from "./fields/PhoneNumberField";
import { DepartmentField } from "./fields/DepartmentField";
import { StartDateField } from "./fields/StartDateField";
import { SubmitButton } from "./button/SubmitButton";

export function UpdateEmployeeForm({
  employee,
  setOpen,
}: {
  employee: IEmployee;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      startDate: new Date(employee.startDate),
      department: employee.department,
    },
  });

  const onSubmit = async (data: employeeSchemaType) => {
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
        <NameField form={form} />
        <EmailField form={form} />
        <PhoneNumberField form={form} />
        <DepartmentField form={form} />
        <StartDateField form={form} />
        <SubmitButton isLoading={isLoading} text="수정하기" />
      </form>
    </Form>
  );
}
