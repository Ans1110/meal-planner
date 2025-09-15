"use server";

import { executeAction } from "@/lib/executeAction";
import { signInSchema, SignInSchemaType } from "../_types/signInSchema";
import { signIn as signInAuth, signOut as signOutAuth } from "@/lib/auth";

const signIn = async (data: SignInSchemaType) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signInSchema.parse(data);
      await signInAuth("credentials", validatedData);
    },
  });
};

const signOut = async () => {
  return await executeAction({
    actionFn: async () => {
      await signOutAuth();
    },
  });
};

export { signIn, signOut };
