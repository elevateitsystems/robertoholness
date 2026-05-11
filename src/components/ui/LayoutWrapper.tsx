'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <main className={cn("flex-1", !isHomePage && "pt-[80px] lg:pt-[116px]")}>
      {children}
    </main>
  );
}
