"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Missing credentials");
      return;
    }

    if (isRegistering) {
      const { error } = await signUp(email, password);
      if (error) {
        alert(error);
      } else {
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-bg p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-md bg-surface border-4 border-primary brutal-shadow-lg p-8 md:p-12 relative"
      >
        <div className="absolute -top-6 left-8 bg-primary text-on-primary font-headline font-black uppercase tracking-widest text-2xl px-6 py-2 border-4 border-primary shadow-[4px_4px_0px_0px_var(--color-secondary)] rotate-[-2deg]">
          PROPOSAL.AI
        </div>

        <h1 className="font-headline font-black text-5xl md:text-6xl uppercase tracking-tighter text-primary mt-6 mb-8 leading-none">
          SYSTEM<br />
          <span className="text-secondary">{isRegistering ? "REGISTER" : "ACCESS"}</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
              Operator ID
            </label>
            <input
              type="email"
              required
              placeholder="operator@acme.corp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-lowest border-4 border-primary px-4 py-3 font-body font-bold text-lg text-primary focus:outline-none focus:border-secondary focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_var(--color-secondary)] transition-all"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
              Passcode
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-lowest border-4 border-primary px-4 py-3 font-body font-bold text-lg text-primary focus:outline-none focus:border-secondary focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_var(--color-secondary)] transition-all"
            />
          </div>

          {/* BUTTON */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-headline font-black text-2xl uppercase py-4 border-4 border-primary brutal-shadow-hover brutal-shadow-active flex items-center justify-center gap-3 cursor-pointer"
            >
              {isRegistering ? "REGISTER" : "INITIALIZE"}
              <span className="material-symbols-outlined font-bold">
                {isRegistering ? "person_add" : "login"}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t-4 border-primary text-center flex flex-col gap-4">
          <button 
            type="button" 
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-body font-bold text-sm text-secondary uppercase tracking-widest hover:underline cursor-pointer"
          >
            {isRegistering ? "ALREADY HAVE ACCESS? INITIALIZE INSTEAD" : "REQUEST NEW OPERATOR ACCESS"}
          </button>
          <p className="font-body font-bold text-sm text-on-surface-variant uppercase tracking-widest">
            UNAUTHORIZED ACCESS STRICTLY PROHIBITED
          </p>
        </div>
      </motion.div>
    </div>
  );
}