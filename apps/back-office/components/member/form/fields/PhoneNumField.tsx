import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "ui";

export function PhoneNumField({ form }) {
  return (
    <FormField
      control={form.control}
      name="phoneNum"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">전화번호</FormLabel>
          <FormDescription className="text-xs">
            멤버가 큐리 시스템에게 연락받을 전화번호입니다.
          </FormDescription>
          <div className="flex w-full items-center space-x-2">
            <FormControl>
              <Input placeholder="ex. 010-3333-3333" {...field} />
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
