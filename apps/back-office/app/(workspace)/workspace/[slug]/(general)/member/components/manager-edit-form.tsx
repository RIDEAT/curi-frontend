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
import {
  useEmployees,
  useManagers,
} from "../../../../../../../lib/hook/swr/useMembers";
import { cn } from "ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";

function ManagerEditForm({
  row,
  setOpen,
}: {
  row: any;
  setOpen: (open: boolean) => void;
}) {
  const { currentWorkspaceId } = useCurrentWorkspace();
  const { managerMutate } = useManagers();
  const [requesting, setRequesting] = useState(false);

  const [name, setName] = useState(row.original.name);
  const [email, setEmail] = useState(row.original.email);
  const [department, setDepartment] = useState(row.original.department);
  const [phoneNum, setPhoneNum] = useState(row.original.phoneNum);

  const onSubmit = async () => {
    try {
      setRequesting(true);
      await MemberAPI.updateManager(currentWorkspaceId, row.original.id, {
        name: name,
        email: email,
        department: department,
        phoneNum: phoneNum,
      });
      await managerMutate();
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

export { ManagerEditForm };
