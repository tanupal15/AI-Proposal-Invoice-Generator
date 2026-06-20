// =============================================================================
// Supabase Client — Browser & Server
// =============================================================================
// Central Supabase client configuration for the entire application.
// Browser client is used in React components, Server client in API routes.
// =============================================================================

import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

// -----------------------------------------------------------------------------
// Environment Variables
// -----------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// -----------------------------------------------------------------------------
// Browser Client (for client components)
// -----------------------------------------------------------------------------
export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Singleton browser client for hooks and context
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }
  return browserClient;
}

// -----------------------------------------------------------------------------
// Server Client (for API routes and server actions)
// -----------------------------------------------------------------------------
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(
    supabaseUrl,
    serviceRoleKey || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// -----------------------------------------------------------------------------
// Database Types (inferred from schema)
// -----------------------------------------------------------------------------
export interface DbUserProfile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbClient {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  company_size: string | null;
  website: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'LEAD';
  created_at: string;
  updated_at: string;
}

export interface DbProposal {
  id: string;
  user_id: string;
  client_id: string | null;
  client_name: string;
  client_industry: string;
  title: string;
  subtitle: string | null;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  estimated_budget: number | null;
  timeline_description: string | null;
  services: unknown[];
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface DbInvoice {
  id: string;
  user_id: string;
  client_id: string | null;
  invoice_number: string;
  client_name: string;
  issue_date: string;
  due_date: string;
  status: 'DRAFT' | 'PENDING' | 'PAID' | 'OVERDUE';
  payment_terms: string | null;
  tax_rate: number;
  currency: string;
  notes: string | null;
  line_items: unknown[];
  subtotal: number;
  tax_amount: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface DbAiGeneration {
  id: string;
  user_id: string;
  type: 'proposal' | 'invoice' | 'quotation' | 'scope_of_work';
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  model: string | null;
  tokens_used: Record<string, unknown> | null;
  latency_ms: number | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}
