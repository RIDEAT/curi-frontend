import { z } from "zod";

export const memberSchema = z.object({
  id: z.number(),

  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  startDate: z.string(),
  role: z
    .string()
    .refine((role) => ["employee", "manager", "admin"].includes(role)),
});
