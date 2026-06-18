import { z } from 'zod';
import {
  ClientInfoSchema,
  ServiceItemSchema,
  LineItemSchema,
  TimelinePhaseSchema,
  ContractClauseSchema,
  UpsellOpportunitySchema,
} from './shared.schema';

/** Input validation schema for Proposals */
export const ProposalInputSchema = z.object({
  client: ClientInfoSchema,
  selectedServices: z.array(ServiceItemSchema),
  projectDescription: z.string().optional(),
  estimatedBudget: z.number().positive().optional(),
  timeline: z.string().optional(),
  specialRequirements: z.array(z.string()).optional(),
  tone: z.enum(['professional', 'friendly', 'technical', 'executive']).optional(),
  includeUpsells: z.boolean().optional(),
  includeContractClauses: z.boolean().optional(),
});

/** Output validation schema for generated Proposals */
export const GeneratedProposalSchema = z.object({
  coverPage: z.object({
    title: z.string(),
    subtitle: z.string(),
    clientName: z.string(),
    date: z.string(),
  }),
  companyIntroduction: z.string(),
  problemStatement: z.string(),
  proposedSolution: z.string(),
  deliverables: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  timeline: z.array(TimelinePhaseSchema),
  pricingTable: z.object({
    lineItems: z.array(LineItemSchema),
    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    total: z.number().nonnegative(),
    paymentSchedule: z.string().optional(),
  }),
  contractClauses: z.array(ContractClauseSchema).optional(),
  upsellSuggestions: z.array(UpsellOpportunitySchema).optional(),
  callToAction: z.string(),
});
