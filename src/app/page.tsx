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

export default function DashboardPage() {
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
              OVERVIEW
            </h2>
            <p className="text-xl font-bold mt-2 bg-primary-container px-2 inline-block border-2 border-primary text-on-primary-container">
              CURRENT STATUS: ACTIVE
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-primary">
              DATE: <span className="font-mono" suppressHydrationWarning>{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</span>
            </p>
          </div>
        </motion.div>

        <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, x: -8, boxShadow: "12px 12px 0px 0px var(--color-primary)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-surface border-4 border-primary brutal-shadow p-6 flex flex-col justify-between min-h-[200px] text-primary cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight">
                TOTAL VALUE
              </h3>
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                payments
              </span>
            </div>
            <div className="mt-8">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter">
                $142,500
              </p>
              <p className="text-sm font-bold mt-2 uppercase flex items-center gap-1 bg-surface-container px-2 py-1 inline-flex border border-primary">
                <span className="material-symbols-outlined text-sm">trending_up</span> +12% vs last month
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, x: -8, boxShadow: "12px 12px 0px 0px #ffcc00" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-primary text-on-primary p-6 flex flex-col justify-between min-h-[200px] border-4 border-primary shadow-[6px_6px_0px_0px_#ffcc00] cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-primary-container">
                ACTIVE PROPOSALS
              </h3>
              <span className="material-symbols-outlined text-4xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                article
              </span>
            </div>
            <div className="mt-8">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter text-on-primary">
                18
              </p>
              <p className="text-sm font-bold mt-2 uppercase text-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-surface-variant">priority_high</span> 4 require attention
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, x: -8, boxShadow: "12px 12px 0px 0px var(--color-primary)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-secondary-container text-on-secondary-container border-4 border-primary brutal-shadow p-6 flex flex-col justify-between min-h-[200px] cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-secondary">
                PENDING INVOICES
              </h3>
              <span className="material-symbols-outlined text-4xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                receipt_long
              </span>
            </div>
            <div className="mt-8">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter text-secondary">
                7
              </p>
              <p className="text-sm font-bold mt-2 uppercase flex items-center gap-1 bg-surface px-2 py-1 inline-flex border border-primary text-secondary">
                <span className="material-symbols-outlined text-sm">warning</span> 2 OVERDUE
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section variants={containerVariants} className="mt-12 text-primary">
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-6 border-b-4 border-primary pb-2">
            <h3 className="text-3xl font-headline font-black uppercase tracking-tight">
              RECENT DOCUMENTS
            </h3>
            <Link
              href="#"
              className="font-bold text-sm uppercase underline decoration-2 underline-offset-4 hover:text-tertiary transition-colors"
            >
              VIEW ALL
            </Link>
          </motion.div>
          
          <motion.div variants={containerVariants} className="space-y-4">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-surface border-4 border-primary brutal-shadow-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-primary-container transition-colors duration-200 cursor-pointer text-primary"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center border-2 border-primary group-hover:bg-surface group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-headline font-bold text-lg uppercase leading-tight">
                    Acme Corp Redesign
                  </h4>
                  <p className="text-sm font-bold text-on-surface-variant">
                    Client: Acme Corp • Due: Oct 30
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8 border-t-2 md:border-t-0 border-primary pt-2 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="font-headline font-black text-xl">$45,000</p>
                </div>
                <span className="bg-surface border-2 border-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  DRAFT
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-surface border-4 border-primary brutal-shadow-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-tertiary-container transition-colors duration-200 cursor-pointer text-primary"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-tertiary text-on-primary flex items-center justify-center border-2 border-primary">
                  <span className="material-symbols-outlined">send</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-headline font-bold text-lg uppercase leading-tight">
                    Q3 Marketing Campaign
                  </h4>
                  <p className="text-sm font-bold text-on-surface-variant">
                    Client: Globex • Sent: Oct 20
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8 border-t-2 md:border-t-0 border-primary pt-2 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="font-headline font-black text-xl">$12,500</p>
                </div>
                <span className="bg-tertiary text-on-primary border-2 border-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  SENT
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-surface border-4 border-primary brutal-shadow-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:bg-surface-dim transition-colors duration-200 cursor-pointer text-primary"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-surface-container-highest border-2 border-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-headline font-bold text-lg uppercase leading-tight">
                    Server Infrastructure Update
                  </h4>
                  <p className="text-sm font-bold text-on-surface-variant">
                    Client: Initech • Paid: Oct 15
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8 border-t-2 md:border-t-0 border-primary pt-2 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="font-headline font-black text-xl">$8,200</p>
                </div>
                <span className="bg-surface border-2 border-primary px-3 py-1 text-xs font-bold uppercase tracking-wider opacity-60">
                  PAID
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <Link href="/proposals/new" aria-label="Create New Document">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9, rotate: 0 }}
            className="fixed bottom-20 md:bottom-8 right-6 md:right-10 w-16 h-16 bg-secondary text-white rounded-none border-4 border-primary shadow-[6px_6px_0px_0px_#1a1a1a] flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl font-bold">
              add
            </span>
          </motion.div>
        </Link>
      </motion.main>
    </AppShell>
  );
}
