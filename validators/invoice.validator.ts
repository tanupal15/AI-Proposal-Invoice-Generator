import { InvoiceInputSchema, GeneratedInvoiceSchema } from '../schemas';
import type { InvoiceInput, GeneratedInvoice } from '../types';

/**
 * Validates InvoiceInput against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateInvoiceInput(data: unknown): InvoiceInput {
  const result = InvoiceInputSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid InvoiceInput: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}

/**
 * Validates GeneratedInvoice (AI Output) against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateInvoiceOutput(data: unknown): GeneratedInvoice {
  const result = GeneratedInvoiceSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid GeneratedInvoice AI Output: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}
