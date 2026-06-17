"use client";

import AppShell from "@/components/AppShell";
import TopAppBar from "@/components/TopAppBar";
import { motion } from "framer-motion";

export default function ProposalPreviewPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AppShell>
      <header className="flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 bg-surface border-b-4 border-primary brutal-shadow print:hidden">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-primary p-2 brutal-button bg-primary-fixed">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-headline font-black uppercase text-primary tracking-tighter">
            PROPOSAL.AI
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-surface-container-highest px-4 py-2 brutal-border font-label font-bold text-sm">
            <span
              className="material-symbols-outlined text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              visibility
            </span>
            PREVIEW MODE
          </div>
          <button className="w-12 h-12 brutal-border bg-primary-fixed flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 pb-32 md:pb-12 bg-background relative">
        <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 sticky top-4 print:hidden">
          <div className="flex gap-2">
            <div className="bg-primary text-on-primary px-4 py-2 font-headline font-bold brutal-shadow flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed">
                auto_awesome
              </span>
              AI ENHANCED
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="bg-primary-fixed text-primary font-headline font-black text-xl px-8 py-4 brutal-button flex items-center gap-3 w-full sm:w-auto justify-center cursor-pointer"
          >
            EXPORT PDF
            <span className="material-symbols-outlined">picture_as_pdf</span>
          </button>
        </div>

        <article className="max-w-5xl mx-auto bg-surface-container-lowest brutal-border brutal-shadow-lg relative z-0 print:border-none print:shadow-none print:w-full print:p-0 print:block">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, boxShadow: "8px 8px 0px 0px #1a1a1a" }}
            whileHover={{ y: -4, x: -4, boxShadow: "12px 12px 0px 0px #1a1a1a" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -right-4 md:-right-12 top-24 w-64 bg-primary-fixed brutal-border z-20 hidden lg:block cursor-pointer print:hidden"
          >
            <div className="border-b-4 border-primary p-2 bg-primary text-on-primary flex items-center justify-between">
              <span className="font-headline font-bold text-xs">
                AI UPSELL SUGGESTION
              </span>
              <span className="material-symbols-outlined text-sm">
                lightbulb
              </span>
            </div>
            <div className="p-4">
              <p className="font-body text-sm font-medium mb-3">
                Based on industry data, adding SEO to this package increases
                closing rate by 14%.
              </p>
              <button className="w-full bg-white text-primary font-bold py-2 brutal-border hover:bg-primary hover:text-white transition-colors text-sm cursor-pointer">
                ADD FOR +$10,000
              </button>
            </div>
          </motion.div>

          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-16 border-b-4 border-primary relative overflow-hidden min-h-[530px] flex flex-col justify-center bg-surface-variant"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute right-0 bottom-0 w-64 h-64 bg-secondary rounded-full -mr-32 -mb-32 brutal-border opacity-50 mix-blend-multiply pointer-events-none"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute left-12 top-12 w-32 h-32 bg-tertiary brutal-border rotate-12 opacity-50 mix-blend-multiply pointer-events-none"
            ></motion.div>
            <div className="relative z-10">
              <p className="font-headline font-bold text-2xl mb-4 text-on-surface-variant tracking-widest">
                COVER PAGE
              </p>
              <h1 className="font-headline font-black text-6xl md:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.85] text-primary break-words">
                ABC<br />
                Restaurant
              </h1>
              <div className="mt-12 inline-block bg-primary text-on-primary px-6 py-3 font-body font-bold text-lg brutal-shadow">
                DIGITAL TRANSFORMATION PACKAGE
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="p-8 md:p-16 border-b-4 border-primary flex flex-col md:flex-row gap-12"
          >
            <div className="md:w-1/3">
              <h2 className="font-headline font-black text-4xl uppercase mb-4 leading-none">
                Company<br />
                Introduction
              </h2>
              <div className="w-16 h-4 bg-primary-fixed brutal-border"></div>
            </div>
            <div className="md:w-2/3">
              <p className="font-body text-xl leading-relaxed font-medium text-primary">
                ABC Restaurant is poised to redefine the culinary landscape. Our
                proposed digital ecosystem will not merely establish an online
                presence, but create a high-conversion engine driving reservations,
                off-premise ordering, and robust brand loyalty.
              </p>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="p-8 md:p-16 border-b-4 border-primary bg-surface text-primary"
          >
            <h2 className="font-headline font-black text-5xl uppercase mb-12 flex items-center gap-4">
              <span
                className="material-symbols-outlined text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                widgets
              </span>
              Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest brutal-border p-6 brutal-shadow hover:-translate-y-2 transition-transform duration-200">
                <div className="w-12 h-12 bg-tertiary brutal-border flex items-center justify-center text-white mb-6">
                  <span className="material-symbols-outlined">language</span>
                </div>
                <h3 className="font-headline font-bold text-2xl uppercase mb-3">
                  Immersive Website
                </h3>
                <p className="font-body">
                  Custom designed React frontend with integrated reservation system
                  and dynamic menu management.
                </p>
              </div>

              <div className="bg-surface-container-lowest brutal-border p-6 brutal-shadow hover:-translate-y-2 transition-transform duration-200">
                <div className="w-12 h-12 bg-secondary brutal-border flex items-center justify-center text-white mb-6">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <h3 className="font-headline font-bold text-2xl uppercase mb-3">
                  Growth Marketing
                </h3>
                <p className="font-body">
                  90-day multi-channel campaign covering Meta Ads, local SEO
                  foundation, and automated email nurturing.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="p-8 md:p-16 border-b-4 border-primary text-primary"
          >
            <h2 className="font-headline font-black text-5xl uppercase mb-12">
              Execution Timeline
            </h2>
            <div className="relative border-l-8 border-primary ml-4 md:ml-8 pb-4">
              <div className="mb-12 relative pl-8 md:pl-12">
                <div className="absolute -left-[18px] top-0 w-7 h-7 bg-primary-fixed brutal-border rounded-full"></div>
                <div className="font-headline font-bold text-xl text-on-surface-variant mb-1">
                  WEEK 1-2
                </div>
                <h3 className="font-headline font-black text-3xl uppercase mb-2">
                  Discovery & Strategy
                </h3>
                <p className="font-body text-lg">
                  Brand audit, competitor analysis, and finalized UI/UX
                  wireframes.
                </p>
              </div>

              <div className="mb-12 relative pl-8 md:pl-12">
                <div className="absolute -left-[18px] top-0 w-7 h-7 bg-tertiary brutal-border rounded-full"></div>
                <div className="font-headline font-bold text-xl text-on-surface-variant mb-1">
                  WEEK 3-6
                </div>
                <h3 className="font-headline font-black text-3xl uppercase mb-2">
                  Development & Content
                </h3>
                <p className="font-body text-lg">
                  Full-stack build, API integrations, and asset generation.
                </p>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[18px] top-0 w-7 h-7 bg-secondary brutal-border rounded-full"></div>
                <div className="font-headline font-bold text-xl text-on-surface-variant mb-1">
                  WEEK 7-8
                </div>
                <h3 className="font-headline font-black text-3xl uppercase mb-2">
                  Launch & Scale
                </h3>
                <p className="font-body text-lg">
                  QA testing, go-live, and activation of marketing funnels.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col lg:flex-row text-primary"
          >
            <div className="flex-1 p-8 md:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-primary bg-surface-bright">
              <h2 className="font-headline font-black text-5xl uppercase mb-12">
                Pricing Table
              </h2>
              <div className="space-y-4 font-headline text-lg">
                <div className="flex justify-between items-end border-b-4 border-primary pb-2">
                  <span className="font-bold uppercase">Core Web Platform</span>
                  <span className="font-black text-2xl">$25,000</span>
                </div>
                <div className="flex justify-between items-end border-b-4 border-primary pb-2">
                  <span className="font-bold uppercase">Marketing Setup</span>
                  <span className="font-black text-2xl">$10,000</span>
                </div>
                <div className="flex justify-between items-end border-b-4 border-primary pb-2 text-on-surface-variant">
                  <span className="font-bold uppercase">Hosting (Annual)</span>
                  <span className="font-black text-2xl">$5,000</span>
                </div>
              </div>
              <div className="mt-12 bg-primary text-primary-fixed p-6 brutal-shadow-lg brutal-border flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="font-headline font-bold text-2xl uppercase tracking-widest text-white">
                  Project Total
                </span>
                <span className="font-headline font-black text-5xl md:text-6xl tracking-tighter">
                  $40,000
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/3 bg-tertiary text-white p-8 md:p-12 border-primary flex flex-col justify-center relative overflow-hidden print:hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
                  backgroundSize: "16px 16px",
                }}
              ></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white text-primary font-bold px-3 py-1 text-xs uppercase brutal-border mb-6">
                  <span className="material-symbols-outlined text-sm text-tertiary">
                    gavel
                  </span>
                  AI Generated
                </div>
                <h3 className="font-headline font-black text-3xl uppercase mb-4 leading-tight">
                  Contract Clauses Added
                </h3>
                <ul className="space-y-4 font-body text-sm font-medium">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-fixed shrink-0">
                      check_box
                    </span>
                    <span>
                      Added specialized food-photography copyright transfer
                      clause.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-fixed shrink-0">
                      check_box
                    </span>
                    <span>
                      Included specific SLA for POS integration downtime.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </article>
      </main>
    </AppShell>
  );
}
