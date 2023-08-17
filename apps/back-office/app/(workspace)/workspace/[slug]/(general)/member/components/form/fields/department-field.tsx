import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "ui";

export function DepartmentField({ form }) {
  return (
    <FormField
      control={form.control}
      name="department"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">부서</FormLabel>
          <div className="flex w-full items-center space-x-2">
            <FormControl>
              <Input placeholder="ex. 개발팀" {...field} />
            </FormControl>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
