"use client";
import AppShell from "@/components/AppShell";
import TopAppBar from "@/components/TopAppBar";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function InvoicesPage() {
  const invoices = [
    { id: "INV-2023-089", client: "Acme Corp", amount: 15000, status: "OVERDUE", date: "Oct 15, 2023", items: "Website Redesign" },
    { id: "INV-2023-090", client: "Initech", amount: 8200, status: "PAID", date: "Oct 12, 2023", items: "Server Maintenance" },
    { id: "INV-2023-091", client: "Globex", amount: 4500, status: "PENDING", date: "Oct 24, 2023", items: "SEO Audit" },
    { id: "INV-2023-092", client: "Soylent Corp", amount: 12500, status: "PAID", date: "Oct 10, 2023", items: "Q3 Marketing Campaign" },
    { id: "INV-2023-093", client: "Massive Dynamic", amount: 32000, status: "PENDING", date: "Oct 28, 2023", items: "Full Stack Development" },
  ];

  return (
    <AppShell>
      <TopAppBar title="PROPOSAL.AI" />
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 p-6 md:p-10 lg:p-14 w-full max-w-7xl mx-auto space-y-12 pb-32"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-primary pb-6">
          <div>
            <h2 className="text-6xl md:text-8xl font-headline font-black tracking-tighter uppercase leading-none">
              INVOICES
            </h2>
          </div>
          <div className="bg-secondary text-on-error border-4 border-primary px-6 py-4 brutal-shadow transform rotate-2">
            <p className="font-headline font-bold text-sm uppercase text-white/80">
              TOTAL OUTSTANDING
            </p>
            <p className="font-headline font-black text-4xl mt-1 text-white">
              $51,500
            </p>
          </div>
        </motion.div>

        <motion.section variants={containerVariants} className="space-y-6">
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-8 border-b-4 border-primary pb-4">
            <h3 className="text-3xl font-headline font-black uppercase tracking-tight text-primary">
              RECENT ACTIVITY
            </h3>
            <div className="flex gap-2">
              <button className="bg-surface border-2 border-primary px-4 py-2 font-bold text-xs uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer">
                FILTER
              </button>
              <button className="bg-surface border-2 border-primary px-4 py-2 font-bold text-xs uppercase hover:bg-primary hover:text-white transition-colors cursor-pointer">
                SORT
              </button>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6">
            {invoices.map((invoice) => (
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -4, x: -4, boxShadow: "8px 8px 0px 0px rgba(26,26,26,1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                key={invoice.id} 
                className="bg-surface border-4 border-primary brutal-shadow-sm p-6 flex flex-col lg:flex-row justify-between gap-6 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
                  <div className="w-16 h-16 bg-primary-container border-2 border-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl text-primary">receipt_long</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-headline font-black text-2xl uppercase tracking-tight text-primary">
                        {invoice.client}
                      </h4>
                      {invoice.status === 'PAID' && (
                        <span className="bg-surface-container-highest border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-primary opacity-70">
                          {invoice.status}
                        </span>
                      )}
                      {invoice.status === 'PENDING' && (
                        <span className="bg-primary border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                          {invoice.status}
                        </span>
                      )}
                      {invoice.status === 'OVERDUE' && (
                        <span className="bg-secondary border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white animate-pulse">
                          {invoice.status}
                        </span>
                      )}
                    </div>
                    <p className="font-body font-bold text-sm text-on-surface-variant flex gap-4">
                      <span>{invoice.id}</span>
                      <span>•</span>
                      <span>Due: {invoice.date}</span>
                    </p>
                    <p className="font-body text-sm mt-2 font-medium">
                      {invoice.items}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row lg:flex-col items-start md:items-center lg:items-end justify-between lg:justify-center gap-4 lg:gap-2 border-t-4 lg:border-t-0 lg:border-l-4 border-primary pt-4 lg:pt-0 lg:pl-8">
                  <div className="text-left lg:text-right">
                    <p className="font-headline font-bold text-sm uppercase text-on-surface-variant">Amount Due</p>
                    <p className="font-headline font-black text-4xl text-primary">
                      ${invoice.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto mt-2">
                    <button className="flex-1 lg:flex-none bg-surface border-2 border-primary p-2 flex items-center justify-center hover:bg-tertiary hover:text-white transition-colors cursor-pointer" title="Download PDF">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                    {invoice.status !== 'PAID' ? (
                      <button className="flex-1 lg:flex-none bg-primary text-white font-bold uppercase text-sm px-6 py-2 border-2 border-primary hover:bg-secondary transition-colors cursor-pointer whitespace-nowrap">
                        MARK PAID
                      </button>
                    ) : (
                      <button className="flex-1 lg:flex-none bg-surface-variant text-on-surface-variant font-bold uppercase text-sm px-6 py-2 border-2 border-primary cursor-not-allowed opacity-50 whitespace-nowrap">
                        SETTLED
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.main>

      <Link href="/invoices/new" aria-label="Create New Invoice">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          className="fixed bottom-20 md:bottom-8 right-6 md:right-10 w-16 h-16 bg-tertiary text-white rounded-none border-4 border-primary shadow-[6px_6px_0px_0px_#1a1a1a] flex items-center justify-center cursor-pointer z-50 group"
        >
          <span className="material-symbols-outlined text-4xl font-bold">
            add
          </span>
        </motion.div>
      </Link>
    </AppShell>
  );
}
