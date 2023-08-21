"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, LoadingButton, pushSuccessToast } from "ui";
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
import { toast } from "ui";
import {
  workspaceEmailSchema,
  workspaceNameSchema,
} from "../../../../../../lib/form-schemas/workspace";
import { IWorkspace } from "workspace-types";
import { useEffect, useState } from "react";
import { WorkspaceAPI } from "../../../../../../lib/api/workspace";

const workspaceSettingFormSchema = z.object({
  workspaceName: workspaceNameSchema,
  emailId: workspaceEmailSchema,
});

type WorkspaceSettingFormValues = z.infer<typeof workspaceSettingFormSchema>;

export function WorkspaceSettingForm({
  currentWorkspaceData,
}: {
  currentWorkspaceData: IWorkspace;
}) {
  const [requesting, setRequesting] = useState(false);

  const form = useForm<WorkspaceSettingFormValues>({
    resolver: zodResolver(workspaceSettingFormSchema),
    defaultValues: {
      workspaceName: currentWorkspaceData?.name || "",
      emailId: currentWorkspaceData?.email || "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: WorkspaceSettingFormValues) => {
    setRequesting(true);
    await WorkspaceAPI.update(
      currentWorkspaceData.id,
      data.workspaceName,
      data.emailId
    );
    pushSuccessToast(
      "워크스페이스 설정 변경",
      "워크스페이스 설정이 변경되었습니다."
    );
    setRequesting(false);
  };

  useEffect(() => {
    if (currentWorkspaceData) {
      form.reset({
        workspaceName: currentWorkspaceData?.name,
        emailId: currentWorkspaceData?.email.split("@")[0] || "",
      });
    }
  }, [currentWorkspaceData]);

  if (!currentWorkspaceData) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>워크스페이스 명</FormLabel>
              <FormControl>
                <Input placeholder="ex.큐리" {...field} />
              </FormControl>
              <FormDescription>
                워크스페이스의 명칭입니다. (2글자 이상, 20글자 이하)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>워크스페이스 이메일</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Input placeholder="ex.큐리" {...field} />
                  <div>@curiboard.com</div>
                </div>
              </FormControl>
              <FormDescription>
                큐리 서비스에서 워크스페이스 내의 멤버에게 보내지는 이메일
                주소입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!requesting ? (
          <Button type="submit">저장하기</Button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </Form>
  );
}
