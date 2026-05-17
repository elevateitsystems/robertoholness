import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
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

      <form className="space-y-6">
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
          />
        </div>

        <Button
          type="button"
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          Send Reset Link
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
