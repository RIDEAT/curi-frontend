import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "ui";

import { EmployeeFormType } from "member-types";
import { MemberAPI } from "../../../lib/api/member";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { formatDate } from "../../../lib/utils/formatDate";
import { employeeSchema, employeeSchemaType } from "./memberSchema";
import { NameField } from "./fields/NameField";
import { EmailField } from "./fields/EmailField";
import { PhoneNumField } from "./fields/PhoneNumField";
import { DepartmentField } from "./fields/DepartmentField";
import { StartDateField } from "./fields/StartDateField";
import { SubmitButton } from "./button/SubmitButton";
import { useEmployees } from "../../../lib/hook/swr/useMember";

export function CreateEmployeeForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { reloadEmployees } = useEmployees(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNum: "",
      department: "",
      startDate: new Date(),
    },
  });

  const onSubmit = async (data: employeeSchemaType) => {
    setIsLoading(true);
    try {
      const employeeFormData = {
        wid: Number(currentWorkspaceId),
        name: data.name,
        email: data.email,
        phoneNum: data.phoneNum,
        startDate: formatDate(data.startDate), // format : 2020-02-02
        department: data.department,
        type: "employee",
      } as EmployeeFormType;

      const { response, result } = await MemberAPI.createEmployee(
        employeeFormData
      );

      reloadEmployees();

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
        <StartDateField form={form} />
        <SubmitButton isLoading={isLoading} text="생성하기" />
      </form>
    </Form>
  );
}
