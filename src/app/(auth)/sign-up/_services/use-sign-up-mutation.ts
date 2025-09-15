import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SignUpSchemaType } from "../_types/signUpSchema";
import { signUp } from "./sign-up-mutation";
import { toast } from "sonner";

const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpSchemaType) => await signUp(data),
    onSuccess: () => {
      toast.success("Sign up successful");
      router.replace("/sign-in");
    },
  });
};

export { useSignUp };
