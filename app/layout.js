"use client"; // Important: Indicates this is a client component

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.href);
      setShowNavbar(
        !window.location.href.includes("login") &&
          !window.location.href.includes("signup")
      );
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-hidden`}
      >
        {showNavbar && (
          <nav className="p-4 overflow-y-hidden">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="font-bold text-xl">
                Vr
              </Link>
              <div className="flex space-x-4 items-center">
                <NavItem href="/cart" icon={ShoppingCartIcon} label="Cart" />

                <NavItem
                  href="/orders"
                  icon={ClipboardDocumentListIcon}
                  label="Orders"
                />

                <NavItem
                  href="/settings"
                  icon={Cog6ToothIcon}
                  label="Settings"
                  // onClick={handleLogout}
                />
                <NavItem
                  href="/login"
                  icon={ArrowRightOnRectangleIcon}
                  label="Logout"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </nav>
        )}
        <main className="min-h-screen overflow-y-hidden">{children}</main>
      </body>
    </html>
  );
}

function NavItem({ href, icon: Icon, label, onClick }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsActive(window.location.href === href);
    }
  }, [href]);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center space-x-1 hover:text-gray-600 ${
        isActive ? "text-blue-600 font-semibold" : ""
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}
