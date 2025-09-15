import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const signInDefaultValues: SignInSchemaType = {
  email: "",
  password: "",
};

export { signInSchema, signInDefaultValues, type SignInSchemaType };
