declare module "member-types" {
  type MemberRoleType = "employee" | "manager" | "admin";
  interface IMember {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    startDate: string;
    role: MemberRoleType;
  }
}
