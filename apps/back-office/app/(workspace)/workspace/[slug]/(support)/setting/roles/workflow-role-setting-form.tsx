"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "ui/lib/utils";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  ErrorBadge,
  LoadingButton,
  LoadingCircle,
  pushSuccessToast,
} from "ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "ui";
import { Input } from "ui";
import { workspaceRolesSchema } from "../../../../../../../lib/form-schemas/workspace";
import { IRole, IWorkspace } from "workspace-types";
import { useEffect, useState } from "react";
import { WorkspaceAPI } from "../../../../../../../lib/api/workspace";
import { useWorkspaces } from "../../../../../../../lib/hook/swr/useWorkspaces";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useCurrentRoles } from "../../../../../../../lib/hook/swr/useCurrentRoles";

const workspaceSettingFormSchema = z.object({
  roles: workspaceRolesSchema,
});

type WorkspaceSettingFormValues = z.infer<typeof workspaceSettingFormSchema>;

export function WorkflowRoleSettingForm() {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { currentRoles, isLoading, error } = useCurrentRoles();

  const [requesting, setRequesting] = useState(false);
  const form = useForm<WorkspaceSettingFormValues>({
    resolver: zodResolver(workspaceSettingFormSchema),
    defaultValues: {
      roles: [],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "roles",
    control: form.control,
  });

  const onSubmit = async (data: WorkspaceSettingFormValues) => {
    const newRoleTypes = data.roles.filter((role) => role.name !== "");
    setRequesting(true);
    await WorkspaceAPI.addRoles(currentWorkspaceId, newRoleTypes as IRole[]);

    pushSuccessToast("역할 추가 성공", "역할을 추가했습니다.");

    setRequesting(false);
    remove();
  };

  const addRole = () => {
    append({ id: Math.random(), name: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <Card className="mb-4">
            <CardHeader>
              <div>
                <h3 className="text-lg font-medium">기존 역할 목록</h3>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <LoadingCircle />
              ) : error ? (
                <ErrorBadge />
              ) : (
                currentRoles?.map((role) => (
                  <Badge key={role.id} className="mr-2 mb-2">
                    {role.name}
                  </Badge>
                ))
              )}
            </CardContent>
          </Card>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`roles.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    역할 목록 추가하기
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    워크플로우에서 할당될 역할 목록입니다. 기존 역할을 삭제할
                    수는 없고 추가만 가능합니다.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={addRole}
          >
            역할 추가하기
          </Button>
        </div>
        {!requesting ? (
          fields.length ? (
            <Button type="submit">저장하기</Button>
          ) : (
            <Button disabled>저장하기</Button>
          )
        ) : (
          <LoadingButton />
        )}
      </form>
    </Form>
  );
}
