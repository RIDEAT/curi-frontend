declare module "workflow-types" {
  interface ISequence {}

  interface IWorkflow {
    id: string;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    sequence: ISequence[];
  }
}
