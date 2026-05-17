import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
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

      <form className="space-y-6">
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
            />
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
            />
          </div>
        </div>

        <Button
          type="button"
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          Sign In
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
