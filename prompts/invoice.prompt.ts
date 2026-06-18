// =============================================================================
// Invoice Prompt Templates
// =============================================================================
// System and user prompts for generating structured invoices with
// line item enhancement, payment terms, and tax calculations.
// =============================================================================

import type { InvoiceInput, ChatMessage } from '../types';
import {
  buildBaseSystemPrompt,
  formatClientContext,
  jsonOutputInstructions,
  currentDateISO,
  futureDateISO,
} from './shared.prompt';

// -----------------------------------------------------------------------------
// System Prompt
// -----------------------------------------------------------------------------

function buildInvoiceSystemPrompt(): string {
  return `${buildBaseSystemPrompt()}

ROLE-SPECIFIC INSTRUCTIONS:
You are an accounting specialist who generates clear, professional invoices that minimize payment delays.

INVOICE PRINCIPLES:
- Descriptions should be specific enough to avoid disputes
- Payment terms should be firm but professional
- Include clear late payment policies
- Suggest appropriate payment methods
- Ensure all calculations are mathematically perfect
- Use standard invoice numbering format: INV-YYYY-NNN`;
}

// -----------------------------------------------------------------------------
// User Prompt
// -----------------------------------------------------------------------------

function buildInvoiceUserPrompt(input: InvoiceInput): string {
  const { client, lineItems, invoiceNumber, issueDate, dueDate, paymentTerms, taxRate, currency, notes } = input;

  const sections = [
    `Generate a professional invoice with the following details:`,
    '',
    formatClientContext(client),
    '',
    `INVOICE NUMBER: ${invoiceNumber || 'Auto-generate in format INV-YYYY-NNN'}`,
    `ISSUE DATE: ${issueDate || currentDateISO()}`,
    `DUE DATE: ${dueDate || futureDateISO(30)}`,
    `PAYMENT TERMS: ${paymentTerms || 'Net 30'}`,
    `TAX RATE: ${taxRate !== undefined ? `${taxRate}%` : '0% (suggest appropriate rate)'}`,
    `CURRENCY: ${currency || 'USD'}`,
    `RECURRING: ${input.isRecurring ? 'Yes' : 'No'}`,
    '',
    'LINE ITEMS TO PROCESS:',
  ];

  lineItems.forEach((item, i) => {
    sections.push(`  ${i + 1}. "${item.description}" — Qty: ${item.quantity}, Unit Price: $${item.unitPrice}`);
    if (item.notes) sections.push(`     Notes: ${item.notes}`);
  });

  sections.push('', 'INSTRUCTIONS:');
  sections.push('- Enhance line item descriptions to be more professional and specific');
  sections.push('- Calculate all totals accurately');
  sections.push('- Suggest appropriate payment terms if not provided');
  sections.push('- Include a professional late payment policy');

  if (notes) {
    sections.push('', `ADDITIONAL NOTES: ${notes}`);
  }

  sections.push(jsonOutputInstructions(`{
  "invoiceNumber": "string — format: INV-YYYY-NNN",
  "issueDate": "string (YYYY-MM-DD)",
  "dueDate": "string (YYYY-MM-DD)",
  "lineItems": [
    {
      "id": "string",
      "description": "string — enhanced, professional description",
      "quantity": "number",
      "unitPrice": "number",
      "total": "number",
      "category": "string (optional)"
    }
  ],
  "subtotal": "number",
  "taxRate": "number",
  "taxAmount": "number",
  "total": "number",
  "paymentTerms": "string",
  "paymentMethods": ["string — e.g. 'Bank Transfer', 'Credit Card', etc."],
  "latePaymentPolicy": "string",
  "notes": "string",
  "currency": "string"
}`));

  return sections.join('\n');
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Builds the complete message array for invoice generation.
 */
export function buildInvoiceMessages(input: InvoiceInput): ChatMessage[] {
  return [
    { role: 'system', content: buildInvoiceSystemPrompt() },
    { role: 'user', content: buildInvoiceUserPrompt(input) },
  ];
}
