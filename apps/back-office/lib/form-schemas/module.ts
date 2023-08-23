import { z } from "zod";

const moduleNameSchema = z.string().nonempty({
  message: "모듈 이름을 입력해주세요.",
});

const moduleTypeSchema = z.string().nonempty({
  message: "모듈 타입을 선택해주세요.",
});

export { moduleNameSchema, moduleTypeSchema };
