import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Button,
  Calendar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "ui";
import { cn } from "ui/lib/utils";

export function StartDateField({ form }) {
  return (
    <FormField
      control={form.control}
      name="startDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base">입사일</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription className="text-xs">
            입사(예정)일을 선택해주세요.
          </FormDescription>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
