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

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};
import { useClients } from "@/hooks/useSupabase";

export default function ClientsPage() {
  const { clients, loading } = useClients();

  const activeClientsCount = clients.filter(c => c.status === "ACTIVE").length;
  const leadClientsCount = clients.filter(c => c.status === "LEAD").length;

  if (loading) {
    return (
      <AppShell>
        <TopAppBar title="PROPOSAL.AI" />
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <p className="font-headline font-black text-2xl animate-pulse">LOADING CLIENTS...</p>
        </div>
      </AppShell>
    );
  }

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
              CLIENTS
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary text-on-primary border-4 border-primary px-6 py-4 brutal-shadow transform -rotate-1 hover:rotate-0 transition-transform">
              <p className="font-headline font-bold text-sm uppercase text-white/80">
                TOTAL ACTIVE
              </p>
              <p className="font-headline font-black text-4xl mt-1 text-white">
                {activeClientsCount}
              </p>
            </div>
            <div className="hidden md:block bg-tertiary text-on-tertiary border-4 border-primary px-6 py-4 brutal-shadow transform rotate-1 hover:rotate-0 transition-transform">
              <p className="font-headline font-bold text-sm uppercase text-white/80">
                NEW LEADS
              </p>
              <p className="font-headline font-black text-4xl mt-1 text-white">
                {leadClientsCount}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.section variants={containerVariants} className="space-y-6">
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-8 border-b-4 border-primary pb-4">
            <h3 className="text-3xl font-headline font-black uppercase tracking-tight text-primary">
              ROSTER
            </h3>
            <div className="relative w-full max-w-xs hidden sm:block">
              <span className="absolute left-3 top-2.5 material-symbols-outlined text-primary">search</span>
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="w-full bg-surface-container-lowest border-2 border-primary pl-10 pr-4 py-2 font-body font-bold text-sm focus:outline-none focus:border-secondary"
              />
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.length === 0 ? (
              <div className="bg-surface border-4 border-primary p-8 text-center md:col-span-2">
                <p className="font-headline font-bold text-lg text-primary">NO CLIENTS FOUND</p>
              </div>
            ) : (
              clients.map((client) => (
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, x: -6, boxShadow: "10px 10px 0px 0px rgba(26,26,26,1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  key={client.id} 
                  className="bg-surface border-4 border-primary brutal-shadow-sm flex flex-col group cursor-pointer"
                >
                  <div className="p-6 flex-1 relative border-b-4 border-primary">
                    <div className="absolute top-6 right-6 flex gap-2">
                      {client.status === 'ACTIVE' && (
                        <span className="bg-primary border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                          {client.status}
                        </span>
                      )}
                      {client.status === 'INACTIVE' && (
                        <span className="bg-surface-variant border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          {client.status}
                        </span>
                      )}
                      {client.status === 'LEAD' && (
                        <span className="bg-tertiary border-2 border-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white animate-pulse">
                          {client.status}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-headline font-black text-3xl uppercase tracking-tight text-primary mb-1 max-w-[80%]">
                      {client.name}
                    </h4>
                    <p className="font-body font-bold text-sm text-secondary mb-6 uppercase">
                      {client.industry}
                    </p>

                    <div className="space-y-3 font-body text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary-fixed">person</span>
                        <span className="text-primary">{client.contact_person || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary-fixed">mail</span>
                        <span className="text-primary">{client.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <span className="bg-primary-container text-on-primary-container font-bold px-2 py-1 border border-primary text-xs uppercase">
                          0 Active Projects
                        </span>
                        <span className="font-headline font-bold text-primary">LTV: TBD</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex bg-surface-container-lowest">
                    <button className="flex-1 py-4 border-r-4 border-primary font-headline font-bold uppercase text-sm flex items-center justify-center gap-2 hover:bg-secondary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">description</span>
                      Proposals
                    </button>
                    <button className="flex-1 py-4 font-headline font-bold uppercase text-sm flex items-center justify-center gap-2 hover:bg-tertiary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">edit</span>
                      Edit Client
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>
      </motion.main>

      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
        aria-label="Add New Client"
        className="fixed bottom-20 md:bottom-8 right-6 md:right-10 w-16 h-16 bg-primary text-white rounded-none border-4 border-primary shadow-[6px_6px_0px_0px_#f5f0e8] flex items-center justify-center cursor-pointer z-50 group"
      >
        <span className="material-symbols-outlined text-4xl font-bold">
          person_add
        </span>
      </motion.button>
    </AppShell>
  );
}
