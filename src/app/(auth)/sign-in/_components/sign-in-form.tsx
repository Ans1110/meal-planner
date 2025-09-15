"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
  signInDefaultValues,
  signInSchema,
  SignInSchemaType,
} from "../_types/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../_services/use-sign-in-mutations";
import { ControlledInput } from "@/components/ui/controlled-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignInForm = () => {
  const form = useForm<SignInSchemaType>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<SignInSchemaType> = (data) => {
    signInMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-3">
          <ControlledInput<SignInSchemaType> name="email" label="Email" />
          <ControlledInput<SignInSchemaType>
            name="password"
            label="Password"
            type="password"
          />
        </div>

        <Button className="w-full" isLoading={signInMutation.isPending}>
          Sign In
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignInForm };
