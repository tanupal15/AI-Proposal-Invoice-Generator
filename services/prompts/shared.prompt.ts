// =============================================================================
// Shared Prompt Utilities
// =============================================================================
// Reusable prompt-building functions used across all document generators.
// Provides template interpolation, context formatting, and JSON output
// instructions that keep all prompts consistent.
// =============================================================================

import type { ClientInfo, ServiceItem } from '../../types';

// -----------------------------------------------------------------------------
// Base System Prompt
// -----------------------------------------------------------------------------

/**
 * Builds the foundational system prompt shared by all generators.
 * Specialized generators prepend their role-specific instructions.
 */
export function buildBaseSystemPrompt(): string {
  return `You are an expert business document generation AI integrated into PROPOSAL.AI — a professional proposal, invoice, and quotation management platform.

CORE PRINCIPLES:
- Generate content that is professional, persuasive, and industry-appropriate
- Use clear, concise language avoiding jargon unless contextually relevant
- Ensure all financial calculations are mathematically correct
- Tailor language and recommendations to the client's industry
- Maintain a confident, authoritative tone

OUTPUT FORMAT:
- Always respond with valid JSON matching the requested schema
- Do not include markdown formatting, code fences, or explanatory text outside the JSON
- Ensure all string values are properly escaped
- Use ISO 8601 date formats (YYYY-MM-DD)
- Use numeric values (not strings) for all financial amounts`;
}

// -----------------------------------------------------------------------------
// Context Builders
// -----------------------------------------------------------------------------

/**
 * Formats client information into a standardized context block
 * that can be inserted into any user prompt.
 */
export function formatClientContext(client: ClientInfo): string {
  const lines = [
    `CLIENT INFORMATION:`,
    `  Name: ${client.name}`,
    `  Industry: ${client.industry}`,
  ];

  if (client.contactPerson) lines.push(`  Contact Person: ${client.contactPerson}`);
  if (client.email) lines.push(`  Email: ${client.email}`);
  if (client.companySize) lines.push(`  Company Size: ${client.companySize}`);
  if (client.website) lines.push(`  Website: ${client.website}`);
  if (client.address) lines.push(`  Address: ${client.address}`);

  return lines.join('\n');
}

/**
 * Formats selected services into a standardized block for prompts.
 */
export function formatServicesContext(services: ServiceItem[]): string {
  if (services.length === 0) return 'SELECTED SERVICES: None specified';

  const lines = ['SELECTED SERVICES:'];
  services.forEach((service, index) => {
    lines.push(`  ${index + 1}. ${service.name} (${service.category})`);
    lines.push(`     Description: ${service.description}`);
    lines.push(`     Base Price: $${service.basePrice.toLocaleString()}`);
    if (service.estimatedHours) {
      lines.push(`     Estimated Hours: ${service.estimatedHours}h`);
    }
  });

  return lines.join('\n');
}

/**
 * Builds a budget context string from an optional budget value.
 */
export function formatBudgetContext(budget?: number): string {
  if (!budget) return 'BUDGET: Not specified by client';
  return `BUDGET: $${budget.toLocaleString()} (client-provided estimate)`;
}

// -----------------------------------------------------------------------------
// JSON Output Instructions
// -----------------------------------------------------------------------------

/**
 * Appends JSON output instructions with the expected schema description.
 * This is appended to every user prompt to ensure consistent structured output.
 */
export function jsonOutputInstructions(schemaDescription: string): string {
  return `

RESPONSE FORMAT:
You MUST respond with a single valid JSON object. Do not include any text before or after the JSON.

Expected JSON structure:
${schemaDescription}

CRITICAL: Respond ONLY with the JSON object. No markdown, no explanations, no code fences.`;
}

// -----------------------------------------------------------------------------
// Template Interpolation
// -----------------------------------------------------------------------------

/**
 * Simple template string interpolation.
 * Replaces {{key}} placeholders with values from the data object.
 *
 * @example
 * interpolateTemplate('Hello {{name}}!', { name: 'World' }) // 'Hello World!'
 */
export function interpolateTemplate(
  template: string,
  data: Record<string, string | number | boolean>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = data[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}

/**
 * Generates today's date in ISO format for use in prompts.
 */
export function currentDateISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculates a future date by adding days to today.
 */
export function futureDateISO(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}
