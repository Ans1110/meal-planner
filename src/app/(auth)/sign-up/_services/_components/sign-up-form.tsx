"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  signUpDefaultValues,
  signUpSchema,
  SignUpSchemaType,
} from "../../_types/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../use-sign-up-mutation";
import { ControlledInput } from "@/components/ui/controlled-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpForm = () => {
  const form = useForm<SignUpSchemaType>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = useSignUp();

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">Create Account</h2>
          <p className="text-muted-foreground text-sm">
            Sign up to get started
          </p>
        </div>

        <div className="space-y-3">
          <ControlledInput<SignUpSchemaType> name="name" label="Full Name" />
          <ControlledInput<SignUpSchemaType> name="email" label="Email" />
          <ControlledInput<SignUpSchemaType>
            name="password"
            label="Password"
            type="password"
          />
          <ControlledInput<SignUpSchemaType>
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />

          <Button className="w-full" isLoading={signUpMutation.isPending}>
            Sign Up
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignUpForm };
