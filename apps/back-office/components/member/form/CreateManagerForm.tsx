import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, LoadingButton } from "ui";

import { MemberFormType } from "member-types";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { MemberAPI } from "../../../lib/api/member";
import { managerSchema, managerSchemaType } from "./memberSchema";
import { NameField } from "./fields/NameField";
import { EmailField } from "./fields/EmailField";
import { PhoneNumberField } from "./fields/PhoneNumberField";
import { DepartmentField } from "./fields/DepartmentField";
import { SubmitButton } from "./button/SubmitButton";

export function CreateManagerForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<managerSchemaType>({
    resolver: zodResolver(managerSchema),
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
        startDate: "2022-05-30",
        type: "manager",
      } as MemberFormType;

      const { response, result } = await MemberAPI.create(managerFormData);
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
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
