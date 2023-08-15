import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";

import { EmployeeFormType } from "member-types";
import { MemberAPI } from "../../../lib/api/member";
import { useCurrentWorkspace } from "../../../lib/hook/useCurrentWorkspace";
import { formatDate } from "../../../lib/utils/formatDate";
import { employeeSchemaType, getEmployeeSchema } from "./memberSchema";
import { NameField } from "./fields/NameField";
import { EmailField } from "./fields/EmailField";
import { PhoneNumField } from "./fields/PhoneNumField";
import { DepartmentField } from "./fields/DepartmentField";
import { StartDateField } from "./fields/StartDateField";
import { SubmitButton } from "./button/SubmitButton";
import { useEmployees, useManagers } from "../../../lib/hook/swr/useMember";
import { useCurrentRoles } from "../../../lib/hook/swr/useCurrentRoles";

export function CreateEmployeeForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentRoles } = useCurrentRoles();
  const { reloadEmployees } = useEmployees(currentWorkspaceId);
  const { managers, isLoading: isLoadingManager } =
    useManagers(currentWorkspaceId);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(getEmployeeSchema(currentRoles)),
    defaultValues: (() => {
      const defaultData = {
        name: "",
        email: "",
        phoneNum: "",
        department: "",
        startDate: new Date(),
      };
      currentRoles.forEach((role) => {
        defaultData[role.name] = "";
      });
      return defaultData;
    })(),
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

  console.log(currentRoles);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-lg space-y-6"
      >
        <div className="flex justify-between gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <NameField form={form} />
            <EmailField form={form} />
            <PhoneNumField form={form} />
            <DepartmentField form={form} />
            <StartDateField form={form} />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {currentRoles.map((role) => (
              <div key={role.id}>
                <FormField
                  control={form.control}
                  name={role.name as keyof employeeSchemaType}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        {role.name}
                      </FormLabel>
                      <div className="flex w-full items-center space-x-2">
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="담당자를 선택해주세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {managers.map((manager) => (
                                <SelectItem
                                  key={manager.id}
                                  value={manager.name}
                                >
                                  {manager.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <SubmitButton isLoading={isLoading} text="생성하기" />
      </form>
    </Form>
  );
}
