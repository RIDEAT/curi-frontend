import { useState } from "react";
import { useRouter } from "next/navigation";
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

import { WorkspaceAPI } from "../../../../lib/api/workspace";
import { workspaceSchema } from "./workspaceSchema";

export function CreateWorkspaceForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: "",
      emailId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof workspaceSchema>) => {
    setIsLoading(true);
    try {
      const { result, response } = await WorkspaceAPI.create(
        data.workspaceName,
        data.emailId
      );

      if (response.ok) {
        toast({
          title: "워크스페이스가 생성되었습니다.",
        });
        router.replace(`/workspace/${result.id}`);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg min-w-lg space-y-6"
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
                <div>@curiboard.com</div>
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
              생성하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
