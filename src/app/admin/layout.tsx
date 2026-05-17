"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopNav } from "@/components/admin/TopNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNav onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
