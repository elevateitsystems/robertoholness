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
import { useAppStore } from "@/lib/store";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 characters"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const setUser = useAppStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: VerifyFormValues) => {
    if (!email) {
      setError("Email is missing. Please try registering or logging in again.");
      return;
    }

    setError(null);
    try {
      const response = await authApi.verifyEmail({ email, code: data.code });
      const verifiedUser = response.data.user;
      setUser(verifiedUser);
      if (verifiedUser && verifiedUser.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify email");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setError(null);
    setResendMessage(null);
    try {
      await authApi.resendEmailVerification({ email });
      setResendMessage("Verification code resent successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Email
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We&apos;ve sent a code to your email. Please enter it below to verify
          your account.
        </p>
        {email && <p className="text-sm font-medium mt-1">{email}</p>}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-[5px] text-center">
          {error}
        </div>
      )}

      {resendMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 text-sm rounded-[5px] text-center">
          {resendMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-foreground mb-2 text-left"
            htmlFor="code"
          >
            Verification Code
          </label>
          <Input
            id="code"
            placeholder="Enter 6-digit code"
            className="rounded-[5px] text-center text-lg tracking-widest h-12 uppercase"
            maxLength={6}
            {...register("code")}
          />
          {errors.code && <p className="text-destructive text-xs mt-1 text-left">{errors.code.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          {isSubmitting ? "Verifying..." : "Verify My Email"}
        </Button>
      </form>

      <div className="mt-6 text-sm">
        <span className="text-muted-foreground">
          Didn&apos;t receive the code?{" "}
        </span>
        <button 
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-primary hover:text-primary-dark font-medium transition-colors bg-transparent border-none p-0 cursor-pointer disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend Code"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
