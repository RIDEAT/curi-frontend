declare module "workflow-types" {
  import { IRole } from "workspace-types";
  interface IModule {
    id: string;
    name: string;
    type: string;
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
  }
  interface IWorkflow {
    id: string;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    sequences: ISequence[];
  }
}
