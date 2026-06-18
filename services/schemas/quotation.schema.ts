import { z } from 'zod';
import { ClientInfoSchema, ServiceItemSchema, LineItemSchema, PricingTierSchema } from './shared.schema';

/** Input validation schema for Quotations */
export const QuotationInputSchema = z.object({
  client: ClientInfoSchema,
  selectedServices: z.array(ServiceItemSchema),
  pricingStrategy: z.enum(['competitive', 'value', 'premium']).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  validityDays: z.number().int().positive().optional(),
  includeTieredPricing: z.boolean().optional(),
  customLineItems: z.array(LineItemSchema).optional(),
  notes: z.string().optional(),
});

/** Output validation schema for generated Quotations */
export const GeneratedQuotationSchema = z.object({
  quotationNumber: z.string(),
  validUntil: z.string(),
  lineItems: z.array(LineItemSchema),
  tiers: z.array(PricingTierSchema).optional(),
  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
  terms: z.array(z.string()),
  notes: z.string(),
  estimatedTimeline: z.string(),
});
