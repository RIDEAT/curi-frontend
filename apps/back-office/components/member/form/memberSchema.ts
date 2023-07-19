import { z } from "zod";

const baseSchema = z.object({
  name: z
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
  email: z.string().email({
    message: "올바른 이메일 형식이 아닙니다.",
  }),
  phoneNum: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: "올바른 전화번호 형식이 아닙니다. 예) 010-1234-5678",
  }),
  department: z.string().min(2, {
    message: "2글자 이상이어야 합니다.",
  }),
});

export const employeeSchema = baseSchema.extend({
  startDate: z.date({
    required_error: "A date of birth is required.",
  }),
});
export type employeeSchemaType = z.infer<typeof employeeSchema>;

export const managerSchema = baseSchema.extend({});
export type managerSchemaType = z.infer<typeof managerSchema>;
