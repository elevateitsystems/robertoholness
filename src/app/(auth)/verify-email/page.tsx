import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyEmailPage() {
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
      </div>

      <form className="space-y-6">
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
            className="rounded-[5px] text-center text-lg tracking-widest h-12"
            maxLength={6}
          />
        </div>

        <Button
          type="button"
          className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11"
        >
          Verify My Email
        </Button>
      </form>

      <div className="mt-6 text-sm">
        <span className="text-muted-foreground">
          Didn&apos;t receive the code?{" "}
        </span>
        <button className="text-primary hover:text-primary-dark font-medium transition-colors bg-transparent border-none p-0 cursor-pointer">
          Resend Code
        </button>
      </div>
    </div>
  );
}
