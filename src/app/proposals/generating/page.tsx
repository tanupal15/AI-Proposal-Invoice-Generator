"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/proposals/preview");
    }, 6000); // 6 seconds for the full animation effect

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-background min-h-screen flex flex-col justify-center items-center p-6 overflow-hidden relative font-body grid-pattern noise-bg"
    >
      {/* Background Shapes */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 border-8 border-secondary rounded-full opacity-20 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-10 w-32 h-32 bg-tertiary opacity-20 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: 360, x: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 left-1/4 w-48 h-48 bg-primary-fixed bauhaus-triangle opacity-20 pointer-events-none"
      />

      <motion.main 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-4xl border-4 border-background bg-primary p-8 md:p-16 relative shadow-[16px_16px_0px_0px_#ffcc00] z-10 flex flex-col items-center text-center"
      >
        <div className="relative w-40 h-40 mb-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-20 h-20 bg-secondary rounded-full border-4 border-primary shadow-[4px_4px_0px_0px_#f5f0e8]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-24 h-24 bg-tertiary border-4 border-primary shadow-[4px_4px_0px_0px_#f5f0e8]"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-4 w-16 h-16 bg-primary-fixed bauhaus-triangle border-4 border-primary shadow-[4px_4px_0px_0px_#f5f0e8]"
          />
        </div>

        <motion.h1 
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-background mb-8 leading-none"
        >
          System<br />
          Working
        </motion.h1>

        <div className="relative h-8 md:h-12 w-full max-w-2xl overflow-hidden mb-16">
          <motion.p 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: [1, 1, 0], y: [0, 0, -20] }}
            transition={{ duration: 2, times: [0, 0.8, 1] }}
            className="absolute inset-0 flex items-center justify-center font-headline font-bold text-xl md:text-3xl text-primary-fixed"
          >
            AI is writing your proposal...
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
            transition={{ duration: 3, delay: 1.8, times: [0, 0.1, 0.9, 1] }}
            className="absolute inset-0 flex items-center justify-center font-headline font-bold text-xl md:text-3xl text-secondary"
          >
            Generating contract clauses...
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1], y: [20, 0, 0] }}
            transition={{ duration: 2, delay: 4.5, times: [0, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center font-headline font-bold text-xl md:text-3xl text-tertiary"
          >
            Predicting upsell opportunities...
          </motion.p>
        </div>

        <div className="w-full border-4 border-background bg-primary relative h-16 overflow-hidden flex items-center">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "anticipate" }}
            className="absolute top-0 left-0 h-full bg-background border-r-4 border-primary flex items-center justify-end overflow-hidden"
          >
            <div className="w-[200%] h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--color-surface-dim)_10px,var(--color-surface-dim)_20px)] opacity-50"></div>
          </motion.div>
          <div className="relative z-10 w-full flex justify-between px-4 font-headline font-black text-xl uppercase mix-blend-difference text-primary">
            <span>Init</span>
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="material-symbols-outlined"
            >
              model_training
            </motion.span>
            <span>Complete</span>
          </div>
        </div>

        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 font-label font-bold text-sm uppercase tracking-widest text-surface-variant hover:text-secondary hover:underline decoration-4 underline-offset-8 transition-colors duration-200 cursor-pointer"
          >
            [ Terminate Process ]
          </motion.div>
        </Link>
      </motion.main>
    </motion.div>
  );
}
