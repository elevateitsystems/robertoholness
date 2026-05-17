import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResetPasswordPage() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Reset Password</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Enter the verification code sent to your email and your new password.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="code">Reset Code</label>
          <Input id="code" placeholder="Enter code" className="rounded-[5px]" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="newPassword">New Password</label>
          <Input id="newPassword" type="password" placeholder="••••••••" className="rounded-[5px]" />
        </div>

        <Button type="button" className="w-full rounded-[5px] bg-primary hover:bg-primary-dark text-white font-medium py-2 text-md h-11">
          Update Password
        </Button>
      </form>
    </div>
  );
}
