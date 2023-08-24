import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNum: z.string(),
  email: z.string(),
  department: z.string(),
  startDate: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;
