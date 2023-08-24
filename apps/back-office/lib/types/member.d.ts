declare module "member-types" {
  type MemberType = "employee" | "manager";

  interface IMember {
    id: string;
    wid: number;
    name: string;
    email: string;
    phoneNum: string;
    department: string;
    managers: IRelatedManagerInfo[];
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
    detail: {
      startDate: string;
      managers: IRelatedManagerInfo[];
    };
  }

  interface IManager extends IMember {}
}
