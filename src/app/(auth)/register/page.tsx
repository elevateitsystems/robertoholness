import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
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

      <form className="space-y-4">
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
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Input id="lastName" placeholder="Doe" className="rounded-[5px]" />
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
          />
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
          />
        </div>

        <Button
          type="button"
          className="w-full mt-6 rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          Create Account
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
