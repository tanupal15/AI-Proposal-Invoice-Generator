import { z } from 'zod';
import { ClientInfoSchema, LineItemSchema } from './shared.schema';

/** Input validation schema for Invoices */
export const InvoiceInputSchema = z.object({
  client: ClientInfoSchema,
  lineItems: z.array(LineItemSchema),
  invoiceNumber: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  paymentTerms: z.string().optional(),
  taxRate: z.number().min(0).max(100).optional(),
  currency: z.string().optional(),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional(),
});

/** Output validation schema for generated Invoices */
export const GeneratedInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  issueDate: z.string(),
  dueDate: z.string(),
  lineItems: z.array(LineItemSchema),
  subtotal: z.number().nonnegative(),
  taxRate: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  total: z.number().nonnegative(),
  paymentTerms: z.string(),
  paymentMethods: z.array(z.string()),
  latePaymentPolicy: z.string(),
  notes: z.string(),
  currency: z.string(),
});
