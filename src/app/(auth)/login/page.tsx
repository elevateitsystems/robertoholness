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
import { useAppStore } from "@/lib/store";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const response = await authApi.login(data);
      setUser(response.data.user);
      router.push("/"); // Redirect to home or dashboard
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to your account
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-[5px] text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                className="block text-sm font-medium text-foreground"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="rounded-[5px]"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/register"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}
