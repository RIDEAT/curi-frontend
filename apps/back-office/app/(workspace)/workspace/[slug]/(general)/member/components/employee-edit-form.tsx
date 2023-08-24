import { z } from "zod";
import { useCurrentWorkspace } from "../../../../../../../lib/hook/useCurrentWorkspace";
import { useState } from "react";
import {
  Button,
  Calendar,
  Input,
  LoadingCircle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
  pushFailToast,
} from "ui";
import {
  employeeEmailSchema,
  employeeNameSchema,
  employeeStartDateSchema,
} from "../../../../../../../lib/form-schemas/employee";
import { MemberAPI } from "../../../../../../../lib/api/member";
import { useEmployees } from "../../../../../../../lib/hook/swr/useMembers";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";

function EmployeeEditForm({
  row,
  setOpen,
}: {
  row: any;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { employeeMutate } = useEmployees();
  const [requesting, setRequesting] = useState(false);

  const [name, setName] = useState(row.original.name);
  const [email, setEmail] = useState(row.original.email);
  const [startDate, setStartDate] = useState(new Date(row.original.startDate));
  const [department, setDepartment] = useState(row.original.department);
  const [phoneNum, setPhoneNum] = useState(row.original.phoneNum);

  const onSubmit = async () => {
    try {
      setRequesting(true);
      await MemberAPI.updateEmployee(currentWorkspaceId, row.original.id, {
        name: name,
        email: email,
        startDate: format(startDate, "yyyy-MM-dd"),
        department: department,
        phoneNum: phoneNum,
      });
      await employeeMutate();
      setRequesting(false);
    } catch (error) {
      pushFailToast("신규 입사자 추가 실패", "다시 시도해주세요.");
      setRequesting(false);
    }
    setOpen(false);
  };

  const enterKeySubmit = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const focusHandler = (e) => {
    e.target.select();
  };

  return (
    <>
      <TableCell>
        <Input
          className="max-w-[500px] truncate font-medium"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={enterKeySubmit}
          onFocus={focusHandler}
        />
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[170px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(startDate, "yyyy-MM-dd")
              ) : (
                <span>Pick a startDate</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <Input
          className="max-w-[500px] truncate font-medium"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={enterKeySubmit}
          onFocus={focusHandler}
        />
      </TableCell>
      <TableCell>
        <Input
          className="max-w-[500px] truncate font-medium"
          value={phoneNum}
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
          onKeyDown={enterKeySubmit}
          onFocus={focusHandler}
        />
      </TableCell>
      <TableCell>
        <Input
          className="max-w-[500px] truncate font-medium"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          onKeyDown={enterKeySubmit}
          onFocus={focusHandler}
        />
      </TableCell>
      <TableCell>
        {!requesting ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onSubmit();
            }}
          >
            <SaveIcon className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost">
            <LoadingCircle />
          </Button>
        )}
      </TableCell>
    </>
  );
}

export { EmployeeEditForm };
