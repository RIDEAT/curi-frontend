import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, LoadingButton } from "ui";

import { EmployeeFormType, IEmployee } from "member-types";
import { employeeSchema, employeeSchemaType } from "./memberSchema";
import { EmailField } from "./fields/EmailField";
import { NameField } from "./fields/NameField";
import { PhoneNumField } from "./fields/PhoneNumField";
import { DepartmentField } from "./fields/DepartmentField";
import { StartDateField } from "./fields/StartDateField";
import { SubmitButton } from "./button/SubmitButton";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { formatDate } from "../../../lib/utils/formatDate";
import { MemberAPI } from "../../../lib/api/member";
import { useEmployees } from "../../../lib/hook/swr/useMember";

export function UpdateEmployeeForm({
  employee,
  setOpen,
}: {
  employee: IEmployee;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { reloadEmployees } = useEmployees(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<employeeSchemaType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phoneNum: employee.phoneNum,
      startDate: new Date(employee.startDate),
      department: employee.department,
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
      } as EmployeeFormType;

      const { response, result } = await MemberAPI.updateEmployee(
        employee.id.toString(),
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
        <SubmitButton isLoading={isLoading} text="수정하기" />
      </form>
    </Form>
  );
}
