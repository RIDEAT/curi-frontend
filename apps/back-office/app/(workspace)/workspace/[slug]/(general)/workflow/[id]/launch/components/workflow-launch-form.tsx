"use client";

import {
  Badge,
  Button,
  Calendar,
  ErrorBadge,
  Input,
  LoadingCircle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui";
import {
  useEmployees,
  useManagers,
} from "../../../../../../../../../lib/hook/swr/useMembers";
import { useEffect, useState } from "react";
import { useWorkflow } from "../../../../../../../../../lib/hook/swr/useWorkflow";
import { useCurrentWorkflow } from "../../../../../../../../../lib/hook/useCurrentWorkflow";
import { EMPLOYEE_NAME } from "../../../../../../../../../lib/constant/role";
import { cn } from "ui/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { ILaunchTargetData } from "../page";
import { Trash2Icon } from "lucide-react";

function WorkflowLaunchForm({
  launchTargetData,
  setLaunchTargetData,
  filteredLaunchTargetData,
}: {
  launchTargetData: ILaunchTargetData[];
  setLaunchTargetData: (data: ILaunchTargetData[]) => void;
  filteredLaunchTargetData: ILaunchTargetData[];
}) {
  const { currentWorkflowId } = useCurrentWorkflow();
  const { requiredRoles, isLoading, error } = useWorkflow(currentWorkflowId);

  if (isLoading) return <LoadingCircle />;
  else if (error) return <ErrorBadge />;

  return (
    requiredRoles && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">{"대상자"}</TableHead>
            <TableHead className="w-[100px]">D-Day (D-0)</TableHead>
            {requiredRoles &&
              requiredRoles.map((role) => (
                <TableHead key={role.id} className="w-[200px]">
                  {role.name}
                </TableHead>
              ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {launchTargetData &&
            launchTargetData.map((data, index) => (
              <LaunchTableRow
                key={index}
                index={index}
                launchTargetData={launchTargetData}
                setLaunchTargetData={setLaunchTargetData}
                filteredLaunchTargetData={filteredLaunchTargetData}
              />
            ))}
        </TableBody>
      </Table>
    )
  );
}

function LaunchTableRow({
  index,
  launchTargetData,
  setLaunchTargetData,
  filteredLaunchTargetData,
}: {
  index: number;
  launchTargetData: ILaunchTargetData[];
  setLaunchTargetData: (data: ILaunchTargetData[]) => void;
  filteredLaunchTargetData: ILaunchTargetData[];
}) {
  const { employees } = useEmployees();
  const { managers } = useManagers();
  const { currentWorkflowId } = useCurrentWorkflow();
  const { requiredRoles, isLoading, error } = useWorkflow(currentWorkflowId);

  const [members, setMembers] = useState([]);

  const setKeyDate = (date: Date) => {
    if (!date) return;
    const newLaunchTargetData = [...launchTargetData];
    newLaunchTargetData[index].keyDate = date;
    setLaunchTargetData(newLaunchTargetData);
  };

  const checkIsMemberExist = (memberId: string) => {
    const newLaunchTargetData = [...filteredLaunchTargetData];
    const isMemberExist = newLaunchTargetData.find(
      (data) => data.memberId === memberId
    );
    return isMemberExist;
  };

  const setMember = (memberId: string) => {
    if (checkIsMemberExist(memberId)) {
      alert("이미 추가된 멤버입니다.");
      return;
    }

    const newLaunchTargetData = [...launchTargetData];
    newLaunchTargetData[index].memberId = memberId;
    setLaunchTargetData(newLaunchTargetData);
  };

  const stakeholdersHandler = (memberId, roleId) => {
    const newLaunchTargetData = [...launchTargetData];
    const managerIndex = newLaunchTargetData[index].members.findIndex(
      (member) => member.roleId === roleId
    );

    if (managerIndex > -1) {
      newLaunchTargetData[index].members[managerIndex].memberId = memberId;
    } else {
      newLaunchTargetData[index].members.push({
        memberId: memberId,
        roleId: roleId,
      });
    }

    setLaunchTargetData(newLaunchTargetData);
  };

  const deleteCurrentRow = () => {
    const newLaunchTargetData = [...launchTargetData];
    newLaunchTargetData[index].valid = false;
    setLaunchTargetData(newLaunchTargetData);
  };

  const handleSelectOpenChange = (open: boolean) => {
    if (open && (!employees || employees.length === 0)) {
      alert("대상자에 할당할 멤버가 없습니다. 좌측 멤버 탭에서 추가해주세요!");
    }
  };

  useEffect(() => {
    if (launchTargetData) {
      const newLaunchTargetData = [...launchTargetData];
      setMembers(newLaunchTargetData[index].members);
    }
  }, [launchTargetData]);

  if (launchTargetData[index].valid === false) return null;

  return (
    <TableRow>
      <TableCell>
        <Select
          onOpenChange={handleSelectOpenChange}
          onValueChange={setMember}
          value={launchTargetData[index].memberId}
        >
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {employees &&
              (employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  <MemberSelectDisplay
                    name={employee.name}
                    email={employee.email}
                  />
                </SelectItem>
              )) as any)}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[170px] justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(launchTargetData[index].keyDate, "yyyy-MM-dd")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={launchTargetData[index].keyDate}
              onSelect={setKeyDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      {members &&
        requiredRoles &&
        requiredRoles.map((role) => (
          <TableCell key={role.id}>
            <SelectRolesWithMember
              index={index}
              role={role}
              members={members}
              stakeholdersHandler={stakeholdersHandler}
              managers={managers}
            />
          </TableCell>
        ))}
      <TableCell>
        <Button variant="outline" onClick={deleteCurrentRow}>
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function SelectRolesWithMember({
  index,
  role,
  members,
  stakeholdersHandler,
  managers,
}: {
  index?: number;
  role: any;
  members: any;
  stakeholdersHandler: any;
  managers: any;
}) {
  const handleSelectWithRoleOpenChange = (open: boolean) => {
    if (open && (!managers || managers.length === 0)) {
      alert(
        `${role.name}에 할당할 매니저가 없습니다. 좌측 멤버 탭에서 매니저를 추가해주세요!`
      );
    }
  };

  return (
    <Select
      onOpenChange={handleSelectWithRoleOpenChange}
      onValueChange={(memberId) => stakeholdersHandler(memberId, role.id)}
      key={`${index}_${role.id}`}
      value={
        members && members.find((member) => member.roleId === role.id)?.memberId
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {managers &&
          managers.map((manager) => (
            <SelectItem key={manager.id} value={manager.id}>
              <MemberSelectDisplay name={manager.name} email={manager.email} />
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

function MemberSelectDisplay({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center flex-wrap">
      <div className="text-sm font-semibold mr-2">{name}</div>
      <Badge variant="outline" className="text-xs font-medium hidden xl:block">
        {email}
      </Badge>
    </div>
  );
}

export { WorkflowLaunchForm };
