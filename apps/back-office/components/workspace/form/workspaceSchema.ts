import { z } from "zod";

export const workspaceSchema = z.object({
  workspaceName: z
    .string()
    .min(2, {
      message: "2글자 이상이어야 합니다.",
    })
    .max(20, {
      message: "20글자 이하여야 합니다.",
    })
    .regex(/^[^\s!@#$%^&*()<>?]+$/, {
      message: "공백과 특수문자를 허용하지 않습니다.",
    }),
  emailId: z
    .string()
    .min(2, {
      message: "2글자 이상이어야 합니다.",
    })
    .max(20, {
      message: "20글자 이하여야 합니다.",
    })
    .regex(/^[^\s!@#$%^&*()<>?]+$/, {
      message: "공백과 특수문자를 허용하지 않습니다.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "영어와 숫자로만 이루어져 있어야 합니다.",
    }),
});
