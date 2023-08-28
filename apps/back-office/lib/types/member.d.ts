declare module "member-types" {
  type MemberType = "employee" | "manager";

  interface IMember {
    id: string;
    wid: number;
    name: string;
    email: string;
    phoneNum: string;
    department: string;
    type: MemberType;
  }

  interface IRelatedManagerInfo {
    id: number;
    name: string;
    roleId: number;
    roleName: string;
  }

  interface IEmployee extends IMember {
    startDate: string;
  }

  interface IManager extends IMember {}
}
