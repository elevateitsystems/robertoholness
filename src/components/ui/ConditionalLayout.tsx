'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { LayoutWrapper } from '@/components/ui/LayoutWrapper';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
      <Footer />
    </>
  );
}
