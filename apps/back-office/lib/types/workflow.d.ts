declare module "workflow-types" {
  import { ModuleType } from "ui";
  import { IRole } from "workspace-types";

  interface IModule {
    id: string;
    name: string;
    type: ModuleType;
    order: number;
    content: any; // request
    // response
    contentId: {
      timestamp: number;
      date: string;
    };
  }

  interface ISequence {
    id: string;
    name: string;
    role: IRole;
    dayOffset: number;
    modules: IModule[];
    checkSatisfaction: boolean;
  }
  interface IWorkflow {
    id: string;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    sequences: ISequence[];
    requiredRoles: IRole[];
  }
}
