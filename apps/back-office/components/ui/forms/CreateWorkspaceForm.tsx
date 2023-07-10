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
} from "ui";
import { useState } from "react";
import { LoadingButton } from "ui";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  workspacename: z
    .string()
    .min(2, {
      message: "2글자 이상이어야 합니다.",
    })
    .max(20, {
      message: "20글자 이하여야 합니다.",
    })
    .regex(/^[^\s!@#$%^&*()<>?]+$/, {
      message: "공백과 특수문자를 허용하지 않습니다.",
    }),
  emailId: z
    .string()
    .min(2, {
      message: "2글자 이상이어야 합니다.",
    })
    .max(20, {
      message: "20글자 이하여야 합니다.",
    })
    .regex(/^[^\s!@#$%^&*()<>?]+$/, {
      message: "공백과 특수문자를 허용하지 않습니다.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "영어와 숫자로만 이루어져 있어야 합니다.",
    }),
});

export function CreateWorkspaceForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspacename: "",
      emailId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workspacename: data.workspacename,
          emailId: data.emailId,
        }),
      });
      console.log(response);
      const result = await response.json();
      if (response.ok) {
        toast({
          title: "워크스페이스가 생성되었습니다.",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <div>request</div>
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
              <div>response</div>
              <code className="text-white">
                {JSON.stringify(result, null, 2)}
              </code>
            </pre>
          ),
        });
        router.replace(`/workspace/${result.workspaceId}`);
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
        className="w-2/3 max-w-screen-md space-y-6"
      >
        <FormField
          control={form.control}
          name="workspacename"
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
              생성하기
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
