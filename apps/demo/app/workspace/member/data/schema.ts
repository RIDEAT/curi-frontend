import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const employeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  department: z.string(),
  startDate: z.string(),
  buddy: z.string(),
  manager: z.string(),
  email: z.string().email(),
  phoneNum: z.string(),
});

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;

export const managerSchema = z.object({
  id: z.number(),
  name: z.string(),
  department: z.string(),
  email: z.string().email(),
  phoneNum: z.string(),
});

export type ManagerSchemaType = z.infer<typeof managerSchema>;
