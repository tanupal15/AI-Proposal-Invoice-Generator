"use client";

import AppShell from "@/components/AppShell";
import TopAppBar from "@/components/TopAppBar";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function NewProposalPage() {
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [services, setServices] = useState({
    website: false,
    marketing: false,
    seo: false,
  });

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServices({ ...services, [e.target.value]: e.target.checked });
  };

  const suggestPricing = () => {
    setIsCalculating(true);
    
    // Simulate API delay with animation
    setTimeout(() => {
      let basePrice = 5000;
      if (services.website) basePrice += 15000;
      if (services.marketing) basePrice += 8000;
      if (services.seo) basePrice += 4500;
      
      const variation = Math.floor(Math.random() * 2000);
      setPrice((basePrice + variation).toString());
      setIsCalculating(false);
    }, 800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/proposals/generating");
  };

  return (
    <AppShell>
      <TopAppBar title="PROPOSAL.AI" />
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 border-b-4 border-primary pb-6 inline-block w-full"
        >
          <h1 className="text-5xl md:text-7xl font-headline font-black text-primary uppercase tracking-tighter leading-none mb-2">
            CREATE NEW
          </h1>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-secondary uppercase tracking-tighter leading-none">
            PROPOSAL
          </h1>
        </motion.div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12" 
          onSubmit={handleSubmit}
        >
          <motion.section variants={itemVariants} className="border-4 border-primary bg-surface p-6 md:p-8 brutal-shadow relative">
            <div className="absolute -top-5 left-6 bg-primary-container border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-primary">
              CLIENT DATA
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex flex-col">
                <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
                  Client Name / Entity
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-transparent border-0 border-b-4 border-primary focus:ring-0 focus:border-secondary px-0 py-3 font-body font-bold text-xl text-primary rounded-none placeholder:text-on-surface-variant/50 transition-colors focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
                  Industry / Type
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Restaurant, SaaS"
                  className="w-full bg-transparent border-0 border-b-4 border-primary focus:ring-0 focus:border-secondary px-0 py-3 font-body font-bold text-xl text-primary rounded-none placeholder:text-on-surface-variant/50 transition-colors focus:outline-none"
                />
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="border-4 border-primary bg-surface p-6 md:p-8 brutal-shadow relative">
            <div className="absolute -top-5 left-6 bg-tertiary border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-on-tertiary">
              SCOPE OF WORK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              <motion.label whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer group">
                <input
                  type="checkbox"
                  name="services"
                  value="website"
                  checked={services.website}
                  onChange={handleServiceChange}
                  className="peer sr-only"
                />
                <div className="border-4 border-primary p-6 bg-surface peer-checked:bg-primary peer-checked:text-on-primary transition-all duration-300 brutal-shadow-sm peer-checked:translate-x-1 peer-checked:translate-y-1 peer-checked:shadow-none h-full flex flex-col items-start group-hover:bg-primary-container group-hover:text-on-primary-container peer-checked:group-hover:bg-primary peer-checked:group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-4xl mb-4">language</span>
                  <span className="font-headline font-black text-2xl uppercase">Website</span>
                  <span className="font-body text-sm mt-2 font-bold opacity-80">
                    Design & Development
                  </span>
                </div>
              </motion.label>

              <motion.label whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer group">
                <input
                  type="checkbox"
                  name="services"
                  value="marketing"
                  checked={services.marketing}
                  onChange={handleServiceChange}
                  className="peer sr-only"
                />
                <div className="border-4 border-primary p-6 bg-surface peer-checked:bg-primary peer-checked:text-on-primary transition-all duration-300 brutal-shadow-sm peer-checked:translate-x-1 peer-checked:translate-y-1 peer-checked:shadow-none h-full flex flex-col items-start group-hover:bg-primary-container group-hover:text-on-primary-container peer-checked:group-hover:bg-primary peer-checked:group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-4xl mb-4">campaign</span>
                  <span className="font-headline font-black text-2xl uppercase">Marketing</span>
                  <span className="font-body text-sm mt-2 font-bold opacity-80">
                    Strategy & Execution
                  </span>
                </div>
              </motion.label>

              <motion.label whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="cursor-pointer group">
                <input
                  type="checkbox"
                  name="services"
                  value="seo"
                  checked={services.seo}
                  onChange={handleServiceChange}
                  className="peer sr-only"
                />
                <div className="border-4 border-primary p-6 bg-surface peer-checked:bg-primary peer-checked:text-on-primary transition-all duration-300 brutal-shadow-sm peer-checked:translate-x-1 peer-checked:translate-y-1 peer-checked:shadow-none h-full flex flex-col items-start group-hover:bg-primary-container group-hover:text-on-primary-container peer-checked:group-hover:bg-primary peer-checked:group-hover:text-on-primary">
                  <span className="material-symbols-outlined text-4xl mb-4">trending_up</span>
                  <span className="font-headline font-black text-2xl uppercase">SEO</span>
                  <span className="font-body text-sm mt-2 font-bold opacity-80">
                    Audit & Optimization
                  </span>
                </div>
              </motion.label>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="border-4 border-primary bg-surface p-6 md:p-8 brutal-shadow relative">
            <div className="absolute -top-5 right-6 bg-secondary border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-on-error">
              FINANCIALS
            </div>
            <div className="flex flex-col md:flex-row gap-6 mt-4 items-end">
              <div className="flex-1 w-full">
                <label className="font-headline font-bold uppercase text-lg mb-2 text-primary block">
                  Estimated Value ($)
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-3 text-2xl font-bold text-primary font-headline">
                    $
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.input
                      key={price}
                      initial={{ opacity: 0.5, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-transparent border-0 border-b-4 border-primary focus:ring-0 focus:border-secondary pl-8 py-3 font-body font-bold text-2xl text-primary rounded-none transition-colors focus:outline-none"
                    />
                  </AnimatePresence>
                </div>
              </div>
              <motion.button
                whileHover={{ y: -4, x: -4, boxShadow: "8px 8px 0px 0px var(--color-primary)" }}
                whileTap={{ y: 0, x: 0, boxShadow: "0px 0px 0px 0px var(--color-primary)" }}
                type="button"
                onClick={suggestPricing}
                disabled={isCalculating}
                className="w-full md:w-auto bg-primary-container text-on-primary-container border-4 border-primary px-8 py-4 font-headline font-black uppercase text-xl hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                {isCalculating ? (
                  <motion.span 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="material-symbols-outlined"
                  >
                    sync
                  </motion.span>
                ) : (
                  <span className="material-symbols-outlined">auto_fix_high</span>
                )}
                {isCalculating ? "CALCULATING..." : "AI Suggest Pricing"}
              </motion.button>
            </div>
          </motion.section>

          <motion.div variants={itemVariants} className="pt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-secondary text-on-error py-6 border-4 border-primary font-headline text-3xl md:text-4xl uppercase font-black brutal-shadow brutal-shadow-active hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-4 cursor-pointer"
            >
              GENERATE WITH AI
              <span className="material-symbols-outlined text-4xl">bolt</span>
            </motion.button>
          </motion.div>
        </motion.form>
      </main>
    </AppShell>
  );
}
