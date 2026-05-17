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

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      const response = await authApi.register(data);
      if (
        response.data?.requiresVerification ||
        response.message?.includes("receive a verification code")
      ) {
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Create Account
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Join our community today
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-[5px] text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="John"
              className="rounded-[5px]"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-destructive text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="rounded-[5px]"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-destructive text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="username"
          >
            Username (Optional)
          </label>
          <Input
            id="username"
            placeholder="johndoe123"
            className="rounded-[5px]"
            {...register("username")}
          />
        </div>

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
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="phoneNumber"
          >
            Phone Number (Optional)
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="(555) 123-4567"
            className="rounded-[5px]"
            {...register("phoneNumber")}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="address"
          >
            Address (Optional)
          </label>
          <Input
            id="address"
            placeholder="123 Main St"
            className="rounded-[5px]"
            {...register("address")}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="password"
          >
            Password
          </label>
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

        <div>
          <label
            className="block text-sm font-medium text-foreground mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="rounded-[5px]"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>



        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href="/login"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
