import { z } from 'zod';

/** Client information schema */
export const ClientInfoSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  industry: z.string().min(1, 'Industry is required'),
  contactPerson: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  companySize: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

/** Service item schema */
export const ServiceItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['website', 'marketing', 'seo', 'design', 'development', 'consulting', 'other']),
  description: z.string(),
  basePrice: z.number().nonnegative(),
  estimatedHours: z.number().positive().optional(),
});

/** Line item schema */
export const LineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  total: z.number().nonnegative(),
  category: z.string().optional(),
  notes: z.string().optional(),
});

/** Timeline phase schema */
export const TimelinePhaseSchema = z.object({
  phase: z.number().int().positive(),
  name: z.string(),
  duration: z.string(),
  startWeek: z.number().positive(),
  endWeek: z.number().positive(),
  deliverables: z.array(z.string()),
  description: z.string(),
});

/** Pricing tier schema */
export const PricingTierSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  features: z.array(z.string()),
  recommended: z.boolean(),
  savings: z.string().optional(),
});

/** Contract clause schema */
export const ContractClauseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  category: z.enum(['ip', 'payment', 'termination', 'liability', 'confidentiality', 'compliance', 'sla', 'general']),
  riskLevel: z.enum(['low', 'medium', 'high']),
  isIndustrySpecific: z.boolean(),
  rationale: z.string(),
});

/** Upsell opportunity schema */
export const UpsellOpportunitySchema = z.object({
  id: z.string(),
  serviceName: z.string(),
  description: z.string(),
  additionalRevenue: z.number().nonnegative(),
  confidenceScore: z.number().min(0).max(1),
  closingRateLift: z.number(),
  rationale: z.string(),
  industry: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
});

/** Deliverable schema */
export const DeliverableSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  acceptanceCriteria: z.array(z.string()),
  estimatedHours: z.number().nonnegative(),
  dependencies: z.array(z.string()).optional(),
  phase: z.number().int().positive(),
});
