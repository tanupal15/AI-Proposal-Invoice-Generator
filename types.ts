// =============================================================================
// AI Integration Layer — Core Type Definitions
// =============================================================================
// Comprehensive TypeScript types for all AI-generated document types,
// shared data structures, configuration, and response wrappers.
// =============================================================================

// -----------------------------------------------------------------------------
// Shared / Reusable Types
// -----------------------------------------------------------------------------

/** Client information shared across all document generators */
export interface ClientInfo {
  name: string;
  industry: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  companySize?: 'startup' | 'small' | 'medium' | 'enterprise';
  website?: string;
}

/** A service that can be selected for proposals/quotations */
export interface ServiceItem {
  id: string;
  name: string;
  category: 'website' | 'marketing' | 'seo' | 'design' | 'development' | 'consulting' | 'other';
  description: string;
  basePrice: number;
  estimatedHours?: number;
}

/** An individual line item for invoices and quotations */
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category?: string;
  notes?: string;
}

/** A phase in a project timeline */
export interface TimelinePhase {
  phase: number;
  name: string;
  duration: string;
  startWeek: number;
  endWeek: number;
  deliverables: string[];
  description: string;
}

/** A pricing tier for quotation packages */
export interface PricingTier {
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended: boolean;
  savings?: string;
}

/** A contract clause with metadata */
export interface ContractClause {
  id: string;
  title: string;
  content: string;
  category: 'ip' | 'payment' | 'termination' | 'liability' | 'confidentiality' | 'compliance' | 'sla' | 'general';
  riskLevel: 'low' | 'medium' | 'high';
  isIndustrySpecific: boolean;
  rationale: string;
}

/** An upsell/cross-sell opportunity */
export interface UpsellOpportunity {
  id: string;
  serviceName: string;
  description: string;
  additionalRevenue: number;
  confidenceScore: number;
  closingRateLift: number;
  rationale: string;
  industry: string;
  priority: 'low' | 'medium' | 'high';
}

/** A deliverable item in scope of work */
export interface Deliverable {
  id: string;
  name: string;
  description: string;
  acceptanceCriteria: string[];
  estimatedHours: number;
  dependencies?: string[];
  phase: number;
}

// -----------------------------------------------------------------------------
// Generator Input Types
// -----------------------------------------------------------------------------

/** Input for AI proposal generation */
export interface ProposalInput {
  client: ClientInfo;
  selectedServices: ServiceItem[];
  projectDescription?: string;
  estimatedBudget?: number;
  timeline?: string;
  specialRequirements?: string[];
  tone?: 'professional' | 'friendly' | 'technical' | 'executive';
  includeUpsells?: boolean;
  includeContractClauses?: boolean;
}

/** Input for AI quotation generation */
export interface QuotationInput {
  client: ClientInfo;
  selectedServices: ServiceItem[];
  pricingStrategy?: 'competitive' | 'value' | 'premium';
  discountPercentage?: number;
  validityDays?: number;
  includeTieredPricing?: boolean;
  customLineItems?: LineItem[];
  notes?: string;
}

/** Input for AI invoice generation */
export interface InvoiceInput {
  client: ClientInfo;
  lineItems: LineItem[];
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
  paymentTerms?: string;
  taxRate?: number;
  currency?: string;
  notes?: string;
  isRecurring?: boolean;
}

/** Input for AI scope of work generation */
export interface ScopeOfWorkInput {
  client: ClientInfo;
  selectedServices: ServiceItem[];
  projectObjectives: string[];
  constraints?: string[];
  assumptions?: string[];
  startDate?: string;
  totalWeeks?: number;
  teamSize?: number;
}

/** Input for AI contract clause generation */
export interface ContractClauseInput {
  client: ClientInfo;
  selectedServices: ServiceItem[];
  projectValue: number;
  contractDuration?: string;
  jurisdiction?: string;
  specialConcerns?: string[];
  existingClauses?: string[];
}

/** Input for AI upsell recommendation generation */
export interface UpsellInput {
  client: ClientInfo;
  currentServices: ServiceItem[];
  clientHistory?: {
    previousProjects: number;
    totalSpend: number;
    lastProjectDate?: string;
    satisfactionScore?: number;
  };
  industryBenchmarks?: boolean;
  maxRecommendations?: number;
}

// -----------------------------------------------------------------------------
// Generator Output Types
// -----------------------------------------------------------------------------

/** Output from AI proposal generation */
export interface GeneratedProposal {
  coverPage: {
    title: string;
    subtitle: string;
    clientName: string;
    date: string;
  };
  companyIntroduction: string;
  problemStatement: string;
  proposedSolution: string;
  deliverables: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  timeline: TimelinePhase[];
  pricingTable: {
    lineItems: LineItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentSchedule?: string;
  };
  contractClauses?: ContractClause[];
  upsellSuggestions?: UpsellOpportunity[];
  callToAction: string;
}

/** Output from AI quotation generation */
export interface GeneratedQuotation {
  quotationNumber: string;
  validUntil: string;
  lineItems: LineItem[];
  tiers?: PricingTier[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  terms: string[];
  notes: string;
  estimatedTimeline: string;
}

/** Output from AI invoice generation */
export interface GeneratedInvoice {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paymentTerms: string;
  paymentMethods: string[];
  latePaymentPolicy: string;
  notes: string;
  currency: string;
}

/** Output from AI scope of work generation */
export interface GeneratedScopeOfWork {
  projectTitle: string;
  projectOverview: string;
  objectives: string[];
  scope: {
    inScope: string[];
    outOfScope: string[];
  };
  deliverables: Deliverable[];
  timeline: TimelinePhase[];
  assumptions: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  changeManagement: string;
  communicationPlan: string;
}

/** Output from AI contract clause generation */
export interface GeneratedContractClauses {
  clauses: ContractClause[];
  summary: string;
  riskAssessment: {
    overallRisk: 'low' | 'medium' | 'high';
    keyRisks: string[];
    mitigations: string[];
  };
  recommendations: string[];
}

/** Output from AI upsell recommendation generation */
export interface UpsellRecommendations {
  opportunities: UpsellOpportunity[];
  totalPotentialRevenue: number;
  averageConfidence: number;
  industryContext: string;
  topRecommendation: UpsellOpportunity;
  reasoning: string;
}

// -----------------------------------------------------------------------------
// Configuration Types
// -----------------------------------------------------------------------------

/** Supported OpenAI models */
export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-3.5-turbo';

/** Configuration for the OpenAI service */
export interface OpenAIConfig {
  apiKey: string;
  model: OpenAIModel;
  temperature: number;
  maxTokens: number;
  organizationId?: string;
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

/** Generation options passed per request */
export interface GenerationOptions {
  model?: OpenAIModel;
  temperature?: number;
  maxTokens?: number;
  mockMode?: boolean;
  mockDelay?: number;
  verbose?: boolean;
}

/** Generic wrapper for all AI responses */
export interface AIResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    model: string;
    tokensUsed: {
      prompt: number;
      completion: number;
      total: number;
    };
    latencyMs: number;
    timestamp: string;
    requestId: string;
    mockMode: boolean;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/** Message format for OpenAI chat completions */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** Interface that both real and mock services implement */
export interface AIServiceInterface {
  chatCompletion(messages: ChatMessage[], options?: GenerationOptions): Promise<AIResponse<string>>;
  structuredOutput<T>(messages: ChatMessage[], options?: GenerationOptions): Promise<AIResponse<T>>;
}
