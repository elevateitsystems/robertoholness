'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { FloatingChatButton } from '@/components/ui/FloatingChatButton';
import { LayoutWrapper } from '@/components/ui/LayoutWrapper';
import { useAppStore } from '@/lib/store';
import { authApi } from '@/lib/api/auth';
import { Skeleton } from '@/components/admin/Skeleton';
import React, { useEffect, useState } from 'react';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((state: any) => state.user);
  const setUser = useAppStore((state: any) => state.setUser);
  
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const initAuth = async () => {
      try {
        const profile = await authApi.getProfile();
        setUser(profile);
      } catch (e) {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };
    initAuth();
  }, [setUser]);

  useEffect(() => {
    if (!checkingAuth && isAdmin) {
      if (!user || user.role !== 'admin') {
        router.push('/');
      }
    }
  }, [checkingAuth, user, isAdmin, router]);

  if (isAdmin) {
    if (checkingAuth) {
      return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
          {/* Sidebar skeleton placeholder */}
          <div className="hidden lg:block w-64 bg-slate-900 flex-shrink-0 animate-pulse" />
          
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            {/* TopNav skeleton placeholder */}
            <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
            
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                <Skeleton type="preview" />
              </div>
            </main>
          </div>
        </div>
      );
    }

    if (!user || user.role !== 'admin') {
      return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
          <div className="hidden lg:block w-64 bg-slate-900 flex-shrink-0 animate-pulse" />
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                <Skeleton type="preview" />
              </div>
            </main>
          </div>
        </div>
      );
    }

    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
      <FloatingChatButton />
      <Footer />
    </>
  );
}
