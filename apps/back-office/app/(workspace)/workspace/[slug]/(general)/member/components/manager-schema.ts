import { z } from "zod";

export const managerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phoneNum: z.string(),
  email: z.string(),
  department: z.string(),
});

export type Manager = z.infer<typeof managerSchema>;
