"use client";

import { useMutation } from "@tanstack/react-query";
import { SignInSchemaType } from "../_types/signInSchema";
import { signIn, signOut } from "./sign-in-mutation";
import { useRouter } from "next/navigation";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInSchemaType) => await signIn(data),
  });
};

const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => await signOut(),
    onSuccess: () => {
      router.replace("/sign-in");
    },
  });
};

export { useSignIn, useSignOut };
