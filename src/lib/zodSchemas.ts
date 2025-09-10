import z from "zod";
import { patterns } from "./constants";

const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);
const requiredStringSchema = z.string().min(1).max(255).trim();

const passwordSchema = z
  .string()
  .max(255)
  .refine((str) => patterns.minimumOneUpperCaseLetter.test(str), {
    message: "Minimum one uppercase letter required",
  })
  .refine((str) => patterns.minimumOneLowerCaseLetter.test(str), {
    message: "Minimum one lowercase letter required",
  })
  .refine((str) => patterns.minimumOneDigit.test(str), {
    message: "Minimum one digit required",
  })
  .refine((str) => patterns.minimumOneSpecialCharacter.test(str), {
    message: "Minimum one special character required",
  })
  .refine((str) => patterns.minEightCharacters.test(str), {
    message: "Minimum eight characters required",
  });

export { regexSchema, requiredStringSchema, passwordSchema };
