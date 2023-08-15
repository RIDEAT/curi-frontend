declare module "workspace-types" {
  interface IRole {
    id: number;
    name: string;
  }
  interface IWorkspace {
    id: string;
    name: string;
    emailId?: string;
    roles: IRole[];
  }
}
