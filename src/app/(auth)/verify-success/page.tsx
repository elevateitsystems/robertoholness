"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function VerifySuccessPage() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-[5px] shadow-xl p-8 relative overflow-hidden text-center space-y-6">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500">
          <CheckCircle className="h-10 w-10" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-black text-foreground">
          Email Verified!
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          Your email address has been successfully verified. Your account is now fully active.
        </p>
      </div>

      <Button
        asChild
        className="w-full rounded-[5px] bg-secondary hover:bg-secondary/95 text-white font-bold h-12 shadow-md transition-all duration-300"
      >
        <Link href="/">
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}
