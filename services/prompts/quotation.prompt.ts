// =============================================================================
// Quotation Prompt Templates
// =============================================================================
// System and user prompts for generating detailed price quotations
// with optional tiered pricing (Basic / Standard / Premium).
// =============================================================================

import type { QuotationInput, ChatMessage } from '../../types';
import {
  buildBaseSystemPrompt,
  formatClientContext,
  formatServicesContext,
  jsonOutputInstructions,
  currentDateISO,
  futureDateISO,
} from './shared.prompt';

// -----------------------------------------------------------------------------
// System Prompt
// -----------------------------------------------------------------------------

function buildQuotationSystemPrompt(): string {
  return `${buildBaseSystemPrompt()}

ROLE-SPECIFIC INSTRUCTIONS:
You are a pricing strategist who creates detailed, transparent quotations that build trust and accelerate decision-making.

PRICING PRINCIPLES:
- Break down costs clearly — no hidden fees
- Justify every line item with a brief rationale
- When tiered pricing is requested, create clear differentiation between tiers
- The "Standard" tier should be the recommended option
- Include all relevant terms: validity period, payment terms, exclusions
- Use round numbers for cleaner presentation ($5,000 not $4,987)`;
}

// -----------------------------------------------------------------------------
// User Prompt
// -----------------------------------------------------------------------------

function buildQuotationUserPrompt(input: QuotationInput): string {
  const { client, selectedServices, pricingStrategy, discountPercentage, validityDays, includeTieredPricing, notes } = input;

  const sections = [
    `Generate a detailed price quotation with the following details:`,
    '',
    formatClientContext(client),
    '',
    formatServicesContext(selectedServices),
    '',
    `PRICING STRATEGY: ${pricingStrategy || 'value'}`,
    `DISCOUNT: ${discountPercentage ? `${discountPercentage}%` : 'None'}`,
    `VALIDITY PERIOD: ${validityDays || 30} days (valid until ${futureDateISO(validityDays || 30)})`,
    `INCLUDE TIERED PRICING: ${includeTieredPricing ? 'Yes — generate Basic, Standard, and Premium tiers' : 'No — single quote only'}`,
    `DATE: ${currentDateISO()}`,
  ];

  if (input.customLineItems && input.customLineItems.length > 0) {
    sections.push('', 'CUSTOM LINE ITEMS TO INCLUDE:');
    input.customLineItems.forEach((item, i) => {
      sections.push(`  ${i + 1}. ${item.description} — Qty: ${item.quantity}, Price: $${item.unitPrice}`);
    });
  }

  if (notes) {
    sections.push('', `ADDITIONAL NOTES: ${notes}`);
  }

  sections.push(jsonOutputInstructions(`{
  "quotationNumber": "string — format: QT-YYYY-NNN",
  "validUntil": "string (YYYY-MM-DD)",
  "lineItems": [
    {
      "id": "string",
      "description": "string",
      "quantity": "number",
      "unitPrice": "number",
      "total": "number",
      "category": "string (optional)",
      "notes": "string (optional)"
    }
  ],
  "tiers": [ (if tiered pricing requested)
    {
      "name": "string — Basic|Standard|Premium",
      "description": "string",
      "price": "number",
      "features": ["string"],
      "recommended": "boolean",
      "savings": "string (optional)"
    }
  ],
  "subtotal": "number",
  "discount": "number",
  "tax": "number",
  "total": "number",
  "terms": ["string — payment and delivery terms"],
  "notes": "string",
  "estimatedTimeline": "string"
}`));

  return sections.join('\n');
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Builds the complete message array for quotation generation.
 */
export function buildQuotationMessages(input: QuotationInput): ChatMessage[] {
  return [
    { role: 'system', content: buildQuotationSystemPrompt() },
    { role: 'user', content: buildQuotationUserPrompt(input) },
  ];
}
