import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "ui";

export function EmailField({ form }) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">이메일 주소</FormLabel>
          <FormDescription className="text-xs">
            멤버가 큐리 시스템에게 연락받을 이메일입니다.
          </FormDescription>
          <div className="flex w-full items-center space-x-2">
            <FormControl>
              <Input placeholder="ex. example@example.com" {...field} />
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
