"use client";
import AppShell from "@/components/AppShell";
import TopAppBar from "@/components/TopAppBar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function AnalyticsPage() {
  const revenueData = [
    { month: "MAY", value: 45 },
    { month: "JUN", value: 65 },
    { month: "JUL", value: 30 },
    { month: "AUG", value: 85 },
    { month: "SEP", value: 55 },
    { month: "OCT", value: 100 },
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
              ANALYTICS
            </h2>
          </div>
          <div className="bg-surface border-4 border-primary px-6 py-2 brutal-shadow-sm">
            <p className="font-headline font-bold text-sm uppercase text-primary">
              LAST 6 MONTHS
            </p>
          </div>
        </motion.div>

        <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-white border-4 border-primary p-6 brutal-shadow-sm flex flex-col justify-between min-h-[180px] cursor-default transition-transform"
          >
            <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-primary-container">
              TOTAL REVENUE (YTD)
            </h3>
            <div className="mt-4">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter">
                $214,500
              </p>
              <p className="text-sm font-bold mt-2 uppercase text-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> 
                +24% vs Last Year
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05 }}
            className="bg-tertiary text-white border-4 border-primary p-6 brutal-shadow-sm flex flex-col justify-between min-h-[180px] cursor-default transition-transform"
          >
            <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-on-tertiary">
              PROPOSAL WIN RATE
            </h3>
            <div className="mt-4">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter">
                68%
              </p>
              <p className="text-sm font-bold mt-2 uppercase flex items-center gap-1 opacity-80">
                <span className="material-symbols-outlined text-sm">check_circle</span> 
                17 of 25 won
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05 }}
            className="bg-secondary text-white border-4 border-primary p-6 brutal-shadow-sm flex flex-col justify-between min-h-[180px] cursor-default transition-transform"
          >
            <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-on-secondary">
              AVG DEAL SIZE
            </h3>
            <div className="mt-4">
              <p className="text-5xl lg:text-6xl font-headline font-black tracking-tighter">
                $12,617
              </p>
              <p className="text-sm font-bold mt-2 uppercase flex items-center gap-1 opacity-80">
                <span className="material-symbols-outlined text-sm">payments</span> 
                Highest: $45K
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.section variants={itemVariants} className="lg:col-span-2 bg-surface border-4 border-primary p-6 md:p-8 brutal-shadow">
            <h3 className="text-3xl font-headline font-black uppercase tracking-tight text-primary mb-8 border-b-4 border-primary pb-2">
              REVENUE TREND
            </h3>
            <div className="h-64 flex items-end justify-between gap-2 md:gap-6 px-2 md:px-8 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 opacity-20">
                <div className="w-full border-b-2 border-dashed border-primary"></div>
                <div className="w-full border-b-2 border-dashed border-primary"></div>
                <div className="w-full border-b-2 border-dashed border-primary"></div>
                <div className="w-full border-b-2 border-dashed border-primary"></div>
              </div>
              
              {revenueData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group z-10 h-full justify-end">
                  <motion.div 
                    initial={{ height: "0%" }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                    className="w-full bg-primary border-4 border-primary group-hover:bg-secondary transition-colors relative cursor-pointer"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border-2 border-primary px-2 py-1 text-xs font-bold font-headline hidden group-hover:block whitespace-nowrap text-primary">
                      ${(data.value * 1000).toLocaleString()}
                    </div>
                  </motion.div>
                  <div className="mt-4 font-headline font-bold text-sm text-primary uppercase">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-primary-container text-on-primary-container border-4 border-primary p-6 md:p-8 brutal-shadow relative">
            <div className="absolute -top-5 left-6 bg-primary border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
              AI INSIGHTS
            </div>
            <motion.div variants={containerVariants} className="mt-6 space-y-6">
              <motion.div variants={itemVariants} whileHover={{ x: 4 }} className="bg-surface border-2 border-primary p-4 hover:bg-surface-variant transition-colors cursor-pointer">
                <h4 className="font-headline font-bold text-lg uppercase text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">trending_up</span>
                  Upsell Opportunity
                </h4>
                <p className="font-body text-sm font-medium text-primary">
                  Clients in the "Technology" sector are 40% more likely to accept SEO add-ons. Consider pitching to Initech.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ x: 4 }} className="bg-surface border-2 border-primary p-4 hover:bg-surface-variant transition-colors cursor-pointer">
                <h4 className="font-headline font-bold text-lg uppercase text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">warning</span>
                  Churn Risk
                </h4>
                <p className="font-body text-sm font-medium text-primary">
                  Globex has been inactive for 90 days. We recommend generating a specialized re-engagement proposal.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ x: 4 }} className="bg-surface border-2 border-primary p-4 hover:bg-surface-variant transition-colors cursor-pointer">
                <h4 className="font-headline font-bold text-lg uppercase text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  Pricing Strategy
                </h4>
                <p className="font-body text-sm font-medium text-primary">
                  Your average deal size is trending up. The AI suggests increasing your base website package price by 15% next month.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.main>
    </AppShell>
  );
}
