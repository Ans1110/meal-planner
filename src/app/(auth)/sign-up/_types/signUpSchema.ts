import { passwordSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";

const signUpSchema = z
  .object({
    name: requiredStringSchema,
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const signUpDefaultValues: SignUpSchemaType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export { signUpSchema, type SignUpSchemaType, signUpDefaultValues };
