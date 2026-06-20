"use client";
// =============================================================================
// Supabase Data Hooks
// =============================================================================
// Custom React hooks for all CRUD operations against the Supabase database.
// Each hook provides loading state, error handling, and data refresh.
// =============================================================================

import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { DbClient, DbProposal, DbInvoice } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

// -----------------------------------------------------------------------------
// useClients
// -----------------------------------------------------------------------------
export function useClients() {
  const [clients, setClients] = useState<DbClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  const fetchClients = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error: err } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setClients((data as DbClient[]) || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = async (client: Partial<DbClient>) => {
    if (!user) return null;
    const { data, error: err } = await supabase
      .from("clients")
      .insert({ ...client, user_id: user.id })
      .select()
      .single();

    if (err) { setError(err.message); return null; }
    await fetchClients();
    return data as DbClient;
  };

  const updateClient = async (id: string, updates: Partial<DbClient>) => {
    const { error: err } = await supabase
      .from("clients")
      .update(updates)
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchClients();
    return true;
  };

  const deleteClient = async (id: string) => {
    const { error: err } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchClients();
    return true;
  };

  return { clients, loading, error, createClient, updateClient, deleteClient, refetch: fetchClients };
}

// -----------------------------------------------------------------------------
// useProposals
// -----------------------------------------------------------------------------
export function useProposals() {
  const [proposals, setProposals] = useState<DbProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  const fetchProposals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error: err } = await supabase
      .from("proposals")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setProposals((data as DbProposal[]) || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const createProposal = async (proposal: Partial<DbProposal>) => {
    if (!user) return null;
    const { data, error: err } = await supabase
      .from("proposals")
      .insert({ ...proposal, user_id: user.id })
      .select()
      .single();

    if (err) { setError(err.message); return null; }
    await fetchProposals();
    return data as DbProposal;
  };

  const updateProposal = async (id: string, updates: Partial<DbProposal>) => {
    const { error: err } = await supabase
      .from("proposals")
      .update(updates)
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchProposals();
    return true;
  };

  const getProposal = async (id: string) => {
    const { data, error: err } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (err) { setError(err.message); return null; }
    return data as DbProposal;
  };

  const deleteProposal = async (id: string) => {
    const { error: err } = await supabase
      .from("proposals")
      .delete()
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchProposals();
    return true;
  };

  return { proposals, loading, error, createProposal, updateProposal, getProposal, deleteProposal, refetch: fetchProposals };
}

// -----------------------------------------------------------------------------
// useInvoices
// -----------------------------------------------------------------------------
export function useInvoices() {
  const [invoices, setInvoices] = useState<DbInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  const fetchInvoices = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error: err } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setInvoices((data as DbInvoice[]) || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const createInvoice = async (invoice: Partial<DbInvoice>) => {
    if (!user) return null;
    const { data, error: err } = await supabase
      .from("invoices")
      .insert({ ...invoice, user_id: user.id })
      .select()
      .single();

    if (err) { setError(err.message); return null; }
    await fetchInvoices();
    return data as DbInvoice;
  };

  const updateInvoice = async (id: string, updates: Partial<DbInvoice>) => {
    const { error: err } = await supabase
      .from("invoices")
      .update(updates)
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchInvoices();
    return true;
  };

  const deleteInvoice = async (id: string) => {
    const { error: err } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (err) { setError(err.message); return false; }
    await fetchInvoices();
    return true;
  };

  return { invoices, loading, error, createInvoice, updateInvoice, deleteInvoice, refetch: fetchInvoices };
}

// -----------------------------------------------------------------------------
// useDashboardStats
// -----------------------------------------------------------------------------
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalValue: 0,
    totalValueChange: 0,
    activeProposals: 0,
    requireAttention: 0,
    pendingInvoices: 0,
    overdueInvoices: 0,
  });
  const [recentDocs, setRecentDocs] = useState<Array<{
    id: string;
    type: "proposal" | "invoice";
    title: string;
    client: string;
    amount: number;
    status: string;
    date: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      setLoading(true);

      // Fetch proposals
      const { data: proposals } = await supabase
        .from("proposals")
        .select("id, title, client_name, estimated_budget, status, created_at");

      // Fetch invoices
      const { data: invoices } = await supabase
        .from("invoices")
        .select("id, invoice_number, client_name, total, status, created_at, due_date");

      const proposalList = proposals || [];
      const invoiceList = invoices || [];

      // Calculate stats
      const activeProposals = proposalList.filter(p => p.status === "DRAFT" || p.status === "SENT");
      const pendingInvoices = invoiceList.filter(i => i.status === "PENDING" || i.status === "OVERDUE");
      const overdueInvoices = invoiceList.filter(i => i.status === "OVERDUE");
      const proposalValue = proposalList.reduce((acc, p) => acc + (p.estimated_budget || 0), 0);
      const invoiceValue = invoiceList.reduce((acc, i) => acc + (i.total || 0), 0);

      setStats({
        totalValue: proposalValue + invoiceValue,
        totalValueChange: 12, // placeholder until we have historical data
        activeProposals: activeProposals.length,
        requireAttention: proposalList.filter(p => p.status === "DRAFT").length,
        pendingInvoices: pendingInvoices.length,
        overdueInvoices: overdueInvoices.length,
      });

      // Build recent documents (combine proposals + invoices, sort by date)
      const docs = [
        ...proposalList.map(p => ({
          id: p.id,
          type: "proposal" as const,
          title: p.title,
          client: p.client_name,
          amount: p.estimated_budget || 0,
          status: p.status,
          date: p.created_at,
        })),
        ...invoiceList.map(i => ({
          id: i.id,
          type: "invoice" as const,
          title: i.invoice_number,
          client: i.client_name,
          amount: i.total || 0,
          status: i.status,
          date: i.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setRecentDocs(docs);
      setLoading(false);
    };

    fetchStats();
  }, [user, supabase]);

  return { stats, recentDocs, loading };
}

// -----------------------------------------------------------------------------
// useAnalytics
// -----------------------------------------------------------------------------
export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    winRate: 0,
    wonCount: 0,
    totalProposals: 0,
    avgDealSize: 0,
    highestDeal: 0,
    revenueByMonth: [] as Array<{ month: string; value: number }>,
  });
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      setLoading(true);

      const { data: proposals } = await supabase
        .from("proposals")
        .select("id, estimated_budget, status, created_at");

      const { data: invoices } = await supabase
        .from("invoices")
        .select("id, total, status, created_at, due_date");

      const proposalList = proposals || [];
      const invoiceList = invoices || [];

      const paidInvoices = invoiceList.filter(i => i.status === "PAID");
      const totalRevenue = paidInvoices.reduce((acc, i) => acc + (i.total || 0), 0);
      const wonProposals = proposalList.filter(p => p.status === "ACCEPTED");
      const allBudgets = proposalList.map(p => p.estimated_budget || 0).filter(b => b > 0);
      const avgDealSize = allBudgets.length > 0 ? Math.round(allBudgets.reduce((a, b) => a + b, 0) / allBudgets.length) : 0;
      const highestDeal = allBudgets.length > 0 ? Math.max(...allBudgets) : 0;

      // Revenue by month (last 6 months)
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const now = new Date();
      const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        const monthInvoices = paidInvoices.filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate.getMonth() === d.getMonth() && invDate.getFullYear() === d.getFullYear();
        });
        return {
          month: months[d.getMonth()],
          value: monthInvoices.reduce((acc, inv) => acc + (inv.total || 0), 0),
        };
      });

      setAnalytics({
        totalRevenue,
        revenueChange: 24, // placeholder
        winRate: proposalList.length > 0 ? Math.round((wonProposals.length / proposalList.length) * 100) : 0,
        wonCount: wonProposals.length,
        totalProposals: proposalList.length,
        avgDealSize,
        highestDeal,
        revenueByMonth,
      });

      setLoading(false);
    };

    fetchAnalytics();
  }, [user, supabase]);

  return { analytics, loading };
}

// -----------------------------------------------------------------------------
// useAiGenerations
// -----------------------------------------------------------------------------
export function useAiGenerations() {
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();
  const { user } = useAuth();

  const fetchGenerations = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error: err } = await supabase
      .from("ai_generations")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setGenerations(data || []);
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  const createGeneration = async (generation: any) => {
    if (!user) return null;
    const { data, error: err } = await supabase
      .from("ai_generations")
      .insert({ ...generation, user_id: user.id })
      .select()
      .single();

    if (err) { setError(err.message); return null; }
    await fetchGenerations();
    return data;
  };

  return { generations, loading, error, createGeneration, refetch: fetchGenerations };
}
