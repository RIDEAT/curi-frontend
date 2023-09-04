import { z } from "zod";

export const alertSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  sequence: z.string(),
  workflow: z.string(),
  overdue: z.string(),
});

export type Alert = z.infer<typeof alertSchema>;
