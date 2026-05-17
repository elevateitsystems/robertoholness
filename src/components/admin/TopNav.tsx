"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { authApi } from "@/lib/api/auth";
import { Menu, User as UserIcon, LogOut, ChevronDown } from "lucide-react";

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const user = useAppStore((state: any) => state.user);
  const setUser = useAppStore((state: any) => state.setUser);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      router.push("/login");
    } catch (e) {
      console.error("Logout failed:", e);
      // fallback in case session is already dead
      setUser(null);
      router.push("/login");
    }
  };

  const displayName = user ? (user.displayName || `${user.firstName} ${user.lastName}` || user.email) : "Admin User";
  const userRoleLabel = user ? user.role.toUpperCase() : "ADMIN";

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-40">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none gap-2 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all"
          >
            {user?.avatar?.url ? (
              <img 
                src={user.avatar.url} 
                alt="Avatar" 
                className="h-8 w-8 rounded-full object-cover border border-gray-200" 
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <UserIcon className="h-5 w-5" />
              </div>
            )}
            <span className="hidden sm:block font-semibold">{displayName}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {/* Elegant Dropdown Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-50 ring-1 ring-black/5 transform origin-top-right transition-all">
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{userRoleLabel}</p>
                <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                {user?.email && (
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
              </div>
              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
