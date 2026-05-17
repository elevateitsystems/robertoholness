"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setError(null);
    setSuccess(false);
    try {
      await authApi.forgotPassword(data);
      setSuccess(true);
      // Wait a moment then redirect to reset-password
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Forgot Password
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-[5px] text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 text-sm rounded-[5px] text-center">
          Reset code sent! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="rounded-[5px]"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || success}
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/login"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
