"use client";

import { cn } from "@/lib/utils"; // Assuming you have standard shadcn cn utility
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Home,
  Image as ImageIcon,
  Menu,
  PanelBottom,
  PanelTop,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type MenuItem = {
  title: string;
  href?: string;
  icon: React.ElementType;
  subItems?: { title: string; href: string }[];
};

const menuItems: MenuItem[] = [
  {
    title: "Header",
    href: "/admin",
    icon: PanelTop,
  },
  {
    title: "Home Page",
    icon: Home,
    subItems: [
      { title: "Banner", href: "/admin/home-page/banner" },
      { title: "About", href: "/admin/home-page/about" },
      { title: "Sales", href: "/admin/home-page/sales" },
      { title: "Join Us On Instagram", href: "/admin/home-page/instagram" },
    ],
  },
  {
    title: "Service Page",
    icon: Briefcase,
    subItems: [
      { title: "Banner", href: "/admin/service/banner" },
      { title: "Service List", href: "/admin/service/list" },
    ],
  },
  {
    title: "Gallery Page",
    icon: ImageIcon,
    subItems: [
      { title: "Banner", href: "/admin/gallery/banner" },
      { title: "Gallery Images", href: "/admin/gallery/images" },
    ],
  },
  {
    title: "Blog Page",
    icon: BookOpen,
    subItems: [
      { title: "Banner", href: "/admin/blog/banner" },
      { title: "Categories", href: "/admin/blog/categories" },
      { title: "Blog Post", href: "/admin/blog/post" },
    ],
  },
  {
    title: "Contact Page",
    icon: Phone,
    subItems: [
      { title: "Banner", href: "/admin/contact/banner" },
      { title: "Contact", href: "/admin/contact/details" },
    ],
  },
  {
    title: "Footer",
    href: "/admin/footer",
    icon: PanelBottom,
  },
];

export function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveSub = item.subItems.some((sub) => pathname === sub.href);
        if (hasActiveSub) {
          setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
        }
      }
    });
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gray-50">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            Admin Panel
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = item.href ? pathname === item.href : false;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMenuOpen = openMenus[item.title];
            const hasActiveSub = hasSubItems && item.subItems!.some(sub => pathname === sub.href);

            return (
              <div key={item.title}>
                {item.href && !hasSubItems ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive ? "text-blue-700" : "text-gray-400",
                      )}
                    />
                    {item.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                      hasActiveSub
                        ? "bg-blue-50/50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 flex-shrink-0",
                          hasActiveSub ? "text-blue-700" : "text-gray-400",
                        )}
                      />
                      {item.title}
                    </div>
                    {isMenuOpen ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                )}

                {hasSubItems && isMenuOpen && (
                  <div className="mt-1 space-y-1 pl-11">
                    {item.subItems!.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className={cn(
                          "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          pathname === sub.href
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                        )}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
