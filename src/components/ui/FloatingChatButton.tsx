"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const MESSENGER_URL = "https://m.me/SimplyDiegos";
const SMS_URL = "sms:+15059900099";

export function FloatingChatButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <Link
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-14 items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-2xl shadow-secondary/35 transition-all hover:-translate-y-1 hover:bg-deep-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:text-base"
        aria-label="Chat with Simply Diego's on Facebook Messenger"
      >
        <MessageCircle className="h-7 w-7" />
        {/* <span>Chat With Us</span> */}
      </Link>
      <Link
        href={SMS_URL}
        className="sr-only"
        aria-label="Text Simply Diego's at 505-990-0099"
      >
        Text Simply Diego&apos;s
      </Link>
    </div>
  );
}
