import { z } from "zod";

const employeeNameSchema = z
  .string()
  .nonempty({
    message: "신규입사자의 이름을 입력해주세요.",
  })
  .max(30, {
    message: "이름은 30자 이내로 입력해주세요.",
  });

const employeeEmailSchema = z.string().email({
  message: "이메일 형식에 맞게 입력해주세요.",
});

const employeeStartDateSchema = z.date({
  required_error: "입사일을 입력해주세요.",
});

export { employeeNameSchema, employeeEmailSchema, employeeStartDateSchema };
