declare module "workspace-types" {
  interface IRole {
    id: number;
    name: string;
  }
  interface IWorkspace {
    id: string;
    name: string;
    email?: string;
    roles: IRole[];
  }
}
