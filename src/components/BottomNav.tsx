"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "DASHBOARD", path: "/", icon: "dashboard" },
    { name: "PROPOSALS", path: "/proposals/new", icon: "article" },
    { name: "INVOICES", path: "/invoices", icon: "receipt" },
    { name: "LOGOUT", path: "/login", icon: "logout" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-background px-2 py-3 border-t-4 border-primary">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (pathname.startsWith('/proposals') && item.name === 'CREATE');

        if (isActive) {
          return (
            <Link
              key={item.name}
              href={item.path}
              className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container font-black p-2 border-2 border-primary w-full brutal-shadow-active transition-all"
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
              <span className="font-label font-bold uppercase text-xs mt-1">
                {item.name}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.path}
            className="flex flex-col items-center justify-center text-primary p-2 hover:bg-tertiary-fixed-dim transition-colors w-full"
          >
            <span className="material-symbols-outlined text-2xl">
              {item.icon}
            </span>
            <span className="font-label font-bold uppercase text-xs mt-1">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
