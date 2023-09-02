"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "ui/lib/utils";
import { Button, buttonVariants } from "ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "ui";
import { RadioGroup, RadioGroupItem } from "ui";
import { toast } from "ui";
import { WorkspaceAPI } from "../../../../../../../lib/api/workspace";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";

const LogoFormSchema = z.object({
  logo: z
    .unknown()
    .refine(
      (file) => {
        if (!file) return false;
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        const extension = (file as File).name.split(".").pop().toLowerCase();
        return allowedExtensions.includes("." + extension);
      },
      { message: "로고는 PNG, JPG, GIF 형식의 파일만 업로드할 수 있습니다." }
    )
    .optional(),
});

type LogoFormValues = z.infer<typeof LogoFormSchema>;

export function LogoForm() {
  const form = useForm<LogoFormValues>({
    resolver: zodResolver(LogoFormSchema),
    defaultValues: {},
  });

  const { currentWorkspaceId } = useCurrentWorkspace();

  async function onSubmit(data: LogoFormValues) {
    const { logo } = data;
    const result = await WorkspaceAPI.uploadImageToS3(currentWorkspaceId, logo);
    toast({
      title: "로고가 변경되었습니다.",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>로고</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <input
                    type="file"
                    name="logo"
                    className="w-[200px] Logo-none bg-transparent font-normal"
                    {...field}
                  />
                </FormControl>
                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
              <FormDescription>
                로고는 PNG, JPG, GIF 형식의 파일만 업로드할 수 있습니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">로고 변경하기</Button>
      </form>
    </Form>
  );
}
