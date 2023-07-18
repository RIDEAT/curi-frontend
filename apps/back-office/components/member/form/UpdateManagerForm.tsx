import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, LoadingButton } from "ui";

import { IMember } from "member-types";
import { managerSchema, managerSchemaType } from "./memberSchema";
import { NameField } from "./fields/NameField";
import { EmailField } from "./fields/EmailField";
import { PhoneNumberField } from "./fields/PhoneNumberField";
import { DepartmentField } from "./fields/DepartmentField";
import { SubmitButton } from "./button/SubmitButton";

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
        <NameField form={form} />
        <EmailField form={form} />
        <PhoneNumberField form={form} />
        <DepartmentField form={form} />
        <SubmitButton isLoading={isLoading} text="수정하기" />
      </form>
    </Form>
  );
}
