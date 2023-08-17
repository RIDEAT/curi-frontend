import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "ui";

import { ManagerFormType } from "member-types";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { MemberAPI } from "../../../../../../../../lib/api/member";
import { managerSchema, managerSchemaType } from "./memberSchema";
import { NameField } from "./fields/name-field";
import { EmailField } from "./fields/email-field";
import { PhoneNumField } from "./fields/phone-num-field";
import { DepartmentField } from "./fields/department-field";
import { SubmitButton } from "./button/submit-button";
import { useManagers } from "../../../../../../../../lib/hook/swr/useMember";

export function CreateManagerForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { reloadManagers } = useManagers(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<managerSchemaType>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNum: "",
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
        phoneNum: data.phoneNum,
        department: data.department,
        startDate: "2022-05-30",
        type: "manager",
      } as ManagerFormType;

      const { response, result } = await MemberAPI.createManager(
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
        <SubmitButton isLoading={isLoading} text="생성하기" />
      </form>
    </Form>
  );
}
