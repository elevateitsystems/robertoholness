"use client";

import { Menu, User } from "lucide-react";

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
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
        {/* <button className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </button> */}

        <div className="relative">
          <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <User className="h-5 w-5" />
            </div>
            <span className="ml-2 hidden sm:block">Admin User</span>
          </button>
        </div>
      </div>
    </header>
  );
}
