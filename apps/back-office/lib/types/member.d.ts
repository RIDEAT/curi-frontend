declare module "member-types" {
  type MemberType = "employee" | "manager";

  interface IMember {
    id: number;
    wid: number;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    type: MemberType;
  }

  interface IEmployee extends IMember {
    startDate: string;
  }

  interface IManager extends IMember {}

  type EmployeeFormType = Omit<IEmployee, "id">;
  type ManagerFormType = Omit<IManager, "id">;
  type MemberFormType = EmployeeFormType | ManagerFormType;

  type EmployeeColumnType = Omit<IEmployee, "id", "wid", "type">;
  type ManagerColumnType = Omit<IManager, "id", "wid", "type">;
}
