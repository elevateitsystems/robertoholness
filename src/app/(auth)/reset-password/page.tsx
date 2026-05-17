"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api/auth";

const resetSchema = z.object({
  code: z.string().length(6, "Code must be 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { code: "", newPassword: "" },
  });

  const onSubmit = async (data: ResetFormValues) => {
    if (!email) {
      setError("Email is missing. Please go back to forgot password page.");
      return;
    }

    setError(null);
    setSuccess(false);
    try {
      await authApi.resetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Reset Password
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter the verification code sent to your email and your new password.
        </p>
        {email && <p className="text-sm font-medium mt-1">{email}</p>}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-[5px] text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 text-sm rounded-[5px] text-center">
          Password updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="code"
          >
            Reset Code
          </label>
          <Input
            id="code"
            placeholder="Enter code"
            className="rounded-[5px] uppercase"
            maxLength={6}
            {...register("code")}
          />
          {errors.code && (
            <p className="text-destructive text-xs mt-1">
              {errors.code.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            className="rounded-[5px]"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-destructive text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || success}
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
