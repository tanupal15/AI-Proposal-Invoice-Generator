"use client";

import AppShell from "@/components/AppShell";
import TopAppBar from "@/components/TopAppBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function CreateInvoicePage() {
  const router = useRouter();
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "Website Development", quantity: 1, price: 15000 },
  ]);

  const [client, setClient] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/invoices");
  };

  return (
    <AppShell>
      <TopAppBar title="PROPOSAL.AI" />
      <main className="flex-1 p-6 md:p-12 w-full max-w-5xl mx-auto space-y-12 pb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-primary pb-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tighter uppercase leading-none text-primary">
              CREATE INVOICE
            </h2>
          </div>
          <div className="bg-primary-container text-on-primary-container border-4 border-primary px-6 py-2 brutal-shadow-sm">
            <p className="font-headline font-bold text-sm uppercase">
              STATUS: DRAFT
            </p>
          </div>
        </motion.div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit} 
          className="space-y-12"
        >
          {/* Client Details Section */}
          <motion.section variants={itemVariants} className="bg-surface border-4 border-primary brutal-shadow p-6 md:p-8 relative">
            <div className="absolute -top-5 left-6 bg-tertiary border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-on-tertiary">
              CLIENT INFO
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex flex-col">
                <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Enter client name"
                  className="w-full bg-transparent border-0 border-b-4 border-primary focus:ring-0 focus:border-secondary px-0 py-3 font-body font-bold text-xl text-primary rounded-none placeholder:text-on-surface-variant/50 transition-colors focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-headline font-bold uppercase text-lg mb-2 text-primary">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-4 border-primary focus:ring-0 focus:border-secondary px-0 py-3 font-body font-bold text-xl text-primary rounded-none placeholder:text-on-surface-variant/50 transition-colors focus:outline-none"
                />
              </div>
            </div>
          </motion.section>

          {/* Line Items Section */}
          <motion.section variants={itemVariants} className="bg-surface border-4 border-primary brutal-shadow p-6 md:p-8 relative">
            <div className="absolute -top-5 left-6 bg-secondary border-4 border-primary px-4 py-1 font-headline font-black uppercase text-xl text-white">
              LINE ITEMS
            </div>
            <div className="mt-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.9, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex flex-col md:flex-row gap-4 items-end border-b-2 border-primary/20 pb-4"
                  >
                    <div className="flex-1 w-full">
                      <label className="font-headline font-bold uppercase text-xs mb-1 block text-primary">Description</label>
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Service description"
                        className="w-full bg-surface-container-lowest border-2 border-primary px-3 py-2 font-body font-bold text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="w-full md:w-24">
                      <label className="font-headline font-bold uppercase text-xs mb-1 block text-primary">Qty</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-lowest border-2 border-primary px-3 py-2 font-body font-bold text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="w-full md:w-32">
                      <label className="font-headline font-bold uppercase text-xs mb-1 block text-primary">Price ($)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={item.price}
                        onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                        className="w-full bg-surface-container-lowest border-2 border-primary px-3 py-2 font-body font-bold text-primary focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="w-full md:w-32">
                      <label className="font-headline font-bold uppercase text-xs mb-1 block text-primary">Total</label>
                      <div className="w-full bg-surface-variant border-2 border-primary px-3 py-2 font-body font-bold text-primary">
                        ${(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="w-full md:w-auto bg-error text-on-error border-2 border-primary p-2 flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleAddItem}
                className="bg-primary-container text-on-primary-container border-2 border-primary px-4 py-2 font-headline font-bold uppercase text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-colors brutal-shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Item
              </motion.button>
            </div>
          </motion.section>

          {/* Totals Section */}
          <motion.section variants={itemVariants} className="flex flex-col md:flex-row justify-end items-center gap-6">
            <motion.div 
              key={totalAmount}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-primary text-white border-4 border-primary brutal-shadow-lg p-6 w-full md:w-auto min-w-[300px]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-headline font-bold uppercase text-lg">Subtotal</span>
                <span className="font-body font-bold text-xl">${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-headline font-bold uppercase text-lg text-white/80">Tax (0%)</span>
                <span className="font-body font-bold text-xl text-white/80">$0</span>
              </div>
              <div className="flex justify-between items-end border-t-4 border-white pt-4">
                <span className="font-headline font-black uppercase text-2xl">Total Due</span>
                <span className="font-headline font-black text-5xl tracking-tighter">
                  ${totalAmount.toLocaleString()}
                </span>
              </div>
            </motion.div>
          </motion.section>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => router.push('/invoices')}
              className="flex-1 bg-surface border-4 border-primary font-headline text-2xl uppercase font-black py-4 hover:bg-surface-variant transition-colors cursor-pointer"
            >
              CANCEL
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-[2] bg-secondary text-white border-4 border-primary font-headline text-2xl md:text-4xl uppercase font-black py-4 brutal-shadow brutal-shadow-active hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-4 group cursor-pointer"
            >
              GENERATE INVOICE
              <span className="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform">
                send
              </span>
            </motion.button>
          </motion.div>
        </motion.form>
      </main>
    </AppShell>
  );
}
