"use client"

import type React from "react";
import { Home, FileText, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/dashboard/advertiser" },
  { icon: <FileText className="h-5 w-5" />, label: "Report", href: "/dashboard/advertiser/reports" },
  { icon: <Bell className="h-5 w-5" />, label: "Notification", href: "/dashboard/advertiser/notifications" },
  { icon: <User className="h-5 w-5" />, label: "Profile", href: "/dashboard/advertiser/profile" },
];

function NavItem({ icon, label, href, active }: NavItemProps) {
  return (
    <Link href={href} passHref>
      <div className="flex flex-col items-center cursor-pointer">
        <div className={`${active ? "text-primary" : "text-gray-500"}`}>{icon}</div>
        <span className={`text-xs ${active ? "text-primary" : "text-gray-500"}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export default function BottomNavigation() {
  const pathname = usePathname(); 

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 mx-auto">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          {...item}
          active={pathname === item.href}
        />
      ))}
    </div>
  );
}