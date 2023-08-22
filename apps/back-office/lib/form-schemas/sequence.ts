import { z } from "zod";

const seqeunceNameSchema = z
  .string()
  .min(2, {
    message: "2글자 이상이어야 합니다.",
  })
  .max(30, {
    message: "30글자 이하여야 합니다.",
  });

const seqeunceRoleSchema = z.string().nonempty({
  message: "역할을 선택해주세요.",
});

// -30 ~ 120
const seqeunceDayOffsetSchema = z
  .string()
  .refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  })
  .refine((val) => parseInt(val, 10) >= -30, {
    message: "최소 -30일 이상이어야 합니다.",
  })
  .refine((val) => parseInt(val, 10) <= 120, {
    message: "최대 120일 이하여야 합니다.",
  });

const prevSequenceSchema = z.string().optional();

export {
  seqeunceNameSchema,
  seqeunceRoleSchema,
  seqeunceDayOffsetSchema,
  prevSequenceSchema,
};
