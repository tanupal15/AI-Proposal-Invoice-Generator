"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const navItems = [
    { name: "DASHBOARD", path: "/", icon: "dashboard" },
    { name: "PROPOSALS", path: "/proposals/new", icon: "article" },
    { name: "INVOICES", path: "/invoices", icon: "receipt" },
    { name: "CLIENTS", path: "/clients", icon: "group" },
    { name: "ANALYTICS", path: "/analytics", icon: "analytics" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { x: -30, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-80 border-r-4 border-primary bg-surface shadow-[8px_0px_0px_0px_rgba(26,26,26,1)] z-40">
      <div className="px-6 py-8 border-b-4 border-primary">
        <h1 className="text-2xl font-black text-primary font-headline uppercase tracking-tighter">
          BAUHAUS_FLOW
        </h1>
      </div>
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="flex flex-col flex-1 py-4 overflow-y-auto no-scrollbar gap-2 px-4"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path || (pathname.startsWith('/proposals') && item.name === 'PROPOSALS');
          
          if (isActive) {
            return (
              <motion.div variants={itemVariants} key={item.name}>
                <Link
                  href={item.path}
                  className="bg-primary text-on-primary font-black px-4 py-3 flex items-center gap-4 border-2 border-primary brutal-shadow-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-transform"
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label uppercase tracking-wide">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div variants={itemVariants} key={item.name}>
              <Link
                href={item.path}
                className="text-primary px-4 py-3 font-bold flex items-center gap-4 hover:bg-secondary hover:text-white border-2 border-transparent hover:border-primary transition-colors hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
                <span className="font-label uppercase tracking-wide">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="p-6 border-t-4 border-primary bg-primary-container text-on-primary-container flex flex-col gap-4">
        <div>
          <div className="font-headline font-bold text-sm uppercase">
            System Status
          </div>
          <div className="text-xs font-bold mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse inline-block"></span>
            ONLINE / SYNCHED
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-primary text-on-primary font-bold uppercase text-xs py-2 px-4 border-2 border-primary brutal-shadow-hover flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
