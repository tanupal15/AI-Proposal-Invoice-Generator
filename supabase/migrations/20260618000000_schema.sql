-- ==========================================
-- Database Schema for AI-Proposal-Invoice-Generator
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


-- ------------------------------------------
-- 0. USER PROFILES TABLE (extends auth.users)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- User Profiles RLS Policies
CREATE POLICY "Users can view their own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Updated_at Trigger
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ------------------------------------------
-- 1. CLIENTS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    industry TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    company_size TEXT, -- startup, small, medium, enterprise
    website TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, LEAD
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for user lookup and performance
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS clients_status_idx ON public.clients(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Clients RLS Policies
CREATE POLICY "Users can view their own clients" 
    ON public.clients FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clients" 
    ON public.clients FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clients" 
    ON public.clients FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clients" 
    ON public.clients FOR DELETE 
    USING (auth.uid() = user_id);

-- Updated_at Trigger
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON public.clients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ------------------------------------------
-- 2. PROPOSALS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_industry TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT', -- DRAFT, SENT, ACCEPTED, REJECTED
    estimated_budget NUMERIC,
    timeline_description TEXT,
    services JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of SelectedServices
    content JSONB NOT NULL, -- full GeneratedProposal output
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for lookup and performance
CREATE INDEX IF NOT EXISTS proposals_user_id_idx ON public.proposals(user_id);
CREATE INDEX IF NOT EXISTS proposals_client_id_idx ON public.proposals(client_id);
CREATE INDEX IF NOT EXISTS proposals_status_idx ON public.proposals(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Proposals RLS Policies
CREATE POLICY "Users can view their own proposals" 
    ON public.proposals FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own proposals" 
    ON public.proposals FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own proposals" 
    ON public.proposals FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own proposals" 
    ON public.proposals FOR DELETE 
    USING (auth.uid() = user_id);

-- Updated_at Trigger
CREATE TRIGGER update_proposals_updated_at 
    BEFORE UPDATE ON public.proposals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ------------------------------------------
-- 3. INVOICES TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    invoice_number TEXT NOT NULL,
    client_name TEXT NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING', -- DRAFT, PENDING, PAID, OVERDUE
    payment_terms TEXT,
    tax_rate NUMERIC DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    notes TEXT,
    line_items JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of LineItem
    subtotal NUMERIC NOT NULL,
    tax_amount NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for lookup and performance
CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS invoices_client_id_idx ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS invoices_status_idx ON public.invoices(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Invoices RLS Policies
CREATE POLICY "Users can view their own invoices" 
    ON public.invoices FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invoices" 
    ON public.invoices FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices" 
    ON public.invoices FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices" 
    ON public.invoices FOR DELETE 
    USING (auth.uid() = user_id);

-- Updated_at Trigger
CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON public.invoices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ------------------------------------------
-- 4. AI GENERATIONS TABLE (audit log)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'proposal', 'invoice', 'quotation', 'scope_of_work'
    input JSONB NOT NULL,
    output JSONB,
    model TEXT,
    tokens_used JSONB,
    latency_ms INTEGER,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS ai_generations_user_id_idx ON public.ai_generations(user_id);
CREATE INDEX IF NOT EXISTS ai_generations_type_idx ON public.ai_generations(type);
CREATE INDEX IF NOT EXISTS ai_generations_status_idx ON public.ai_generations(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;

-- AI Generations RLS Policies
CREATE POLICY "Users can view their own generations"
    ON public.ai_generations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations"
    ON public.ai_generations FOR INSERT
    WITH CHECK (auth.uid() = user_id);


-- ------------------------------------------
-- 5. STORAGE BUCKETS
-- ------------------------------------------
-- Documents bucket for PDFs and exported files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents',
    'documents',
    false,
    52428800, -- 50MB
    ARRAY['application/pdf', 'image/png', 'image/jpeg']
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies (users can only access their own folder)
CREATE POLICY "Users can upload their own documents"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view their own documents"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own documents"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
