import { z } from "zod";

const workflowNameSchema = z
  .string()
  .min(2, {
    message: "2글자 이상이어야 합니다.",
  })
  .max(30, {
    message: "30글자 이하여야 합니다.",
  });

export { workflowNameSchema };
