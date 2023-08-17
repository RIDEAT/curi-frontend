import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "ui";

import { EmployeeFormType, IEmployee } from "member-types";
import { employeeSchemaType, getEmployeeSchema } from "./memberSchema";
import { EmailField } from "./fields/email-field";
import { NameField } from "./fields/name-field";
import { PhoneNumField } from "./fields/phone-num-field";
import { DepartmentField } from "./fields/department-field";
import { StartDateField } from "./fields/start-date-field";
import { SubmitButton } from "./button/submit-button";
import { useCurrentWorkspace } from "../../../../../../../../lib/hook/useCurrentWorkspace";
import { formatDate } from "../../../../../../../../lib/utils/formatDate";
import { MemberAPI } from "../../../../../../../../lib/api/member";
import { useEmployees } from "../../../../../../../../lib/hook/swr/useMember";
import { useWorkspaces } from "../../../../../../../../lib/hook/swr/useWorkspaces";

export function UpdateEmployeeForm({
  employee,
  setOpen,
}: {
  employee: IEmployee;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { getRolesInWorkspace } = useWorkspaces();
  const { reloadEmployees } = useEmployees(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<employeeSchemaType>({
    resolver: zodResolver(
      getEmployeeSchema(getRolesInWorkspace(currentWorkspaceId))
    ),
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phoneNum: employee.phoneNum,
      startDate: new Date(employee.startDate),
      department: employee.department,
      // TODO : role 추가
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
