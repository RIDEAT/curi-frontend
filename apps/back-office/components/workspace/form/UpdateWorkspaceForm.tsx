import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
  LoadingButton,
} from "ui";

import { IWorkspace } from "workspace-types";
import { WorkspaceAPI } from "../../../lib/api/workspace";
import { workspaceSchema } from "../../../app/(workspace)/create-workspace/components/workspaceSchema";

export function UpdateWorkspaceForm({
  targetWorkspace,
  setOpen,
}: {
  targetWorkspace: IWorkspace;
  setOpen: (open: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: targetWorkspace.name,
      emailId: targetWorkspace.email,
    },
  });

  const onSubmit = async (data: z.infer<typeof workspaceSchema>) => {
    setIsLoading(true);
    try {
      const { result, response } = await WorkspaceAPI.update(
        targetWorkspace.id,
        data.workspaceName,
        data.emailId
      );

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
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                워크스페이스 명
              </FormLabel>
              <FormControl>
                <Input placeholder="ex. curi " {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                큐리에서 사용될 워크스페이스의 명칭이 됩니다. (2글자 이상,
                20글자 이하)
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                이메일 주소
              </FormLabel>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="ex. example" {...field} />
                </FormControl>
                <div>@curi.work</div>
              </div>
              <FormDescription className="text-xs">
                큐리에서 멤버와 연락을 주고 받을 이메일 주소입니다.
              </FormDescription>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full">
              수정하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
