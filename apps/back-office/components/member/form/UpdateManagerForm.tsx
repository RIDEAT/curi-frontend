import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, LoadingButton } from "ui";

import { IMember, ManagerFormType } from "member-types";
import { managerSchema, managerSchemaType } from "./memberSchema";
import { NameField } from "./fields/NameField";
import { EmailField } from "./fields/EmailField";
import { PhoneNumField } from "./fields/PhoneNumField";
import { DepartmentField } from "./fields/DepartmentField";
import { SubmitButton } from "./button/SubmitButton";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { MemberAPI } from "../../../lib/api/member";
import { useManagers } from "../../../lib/hook/swr/useMember";

export function UpdateManagerForm({
  manager,
  setOpen,
}: {
  manager: IMember;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { reloadManagers } = useManagers(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<managerSchemaType>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      name: manager.name,
      email: manager.email,
      phoneNum: manager.phoneNum,
      department: manager.department,
    },
  });

  const onSubmit = async (data: managerSchemaType) => {
    setIsLoading(true);
    try {
      const managerFormData = {
        wid: Number(currentWorkspaceId),
        name: data.name,
        email: data.email,
        phoneNum: data.phoneNum,
        department: data.department,
      } as ManagerFormType;

      const { response, result } = await MemberAPI.updateManager(
        manager.id.toString(),
        managerFormData
      );

      reloadManagers();

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
        <PhoneNumField form={form} />
        <DepartmentField form={form} />
        <SubmitButton isLoading={isLoading} text="수정하기" />
      </form>
    </Form>
  );
}
