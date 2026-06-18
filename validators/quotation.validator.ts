import { QuotationInputSchema, GeneratedQuotationSchema } from '../schemas';
import type { QuotationInput, GeneratedQuotation } from '../types';

/**
 * Validates QuotationInput against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateQuotationInput(data: unknown): QuotationInput {
  const result = QuotationInputSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid QuotationInput: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}

/**
 * Validates GeneratedQuotation (AI Output) against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateQuotationOutput(data: unknown): GeneratedQuotation {
  const result = GeneratedQuotationSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid GeneratedQuotation AI Output: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}
