// =============================================================================
// Proposal Prompt Templates
// =============================================================================
// System and user prompts for generating complete business proposals.
// Produces: cover page, intro, problem statement, solution, deliverables,
// timeline, pricing table, and optional contract clauses / upsells.
// =============================================================================

import type { ProposalInput, ChatMessage } from '../../types';
import {
  buildBaseSystemPrompt,
  formatClientContext,
  formatServicesContext,
  formatBudgetContext,
  jsonOutputInstructions,
  currentDateISO,
} from './shared.prompt';

// -----------------------------------------------------------------------------
// System Prompt
// -----------------------------------------------------------------------------

function buildProposalSystemPrompt(): string {
  return `${buildBaseSystemPrompt()}

ROLE-SPECIFIC INSTRUCTIONS:
You are a senior proposal writer with 15+ years of experience in crafting winning business proposals. Your proposals have a 70%+ close rate.

WRITING STYLE:
- Open with impact — lead with the client's pain point and your solution
- Use specific, quantifiable statements wherever possible
- Structure content for executive-level skimmability
- Make deliverables concrete and outcome-oriented
- Price confidently — never apologize for pricing

INDUSTRY AWARENESS:
- Tailor terminology to the client's industry
- Reference industry-specific challenges and opportunities
- Suggest relevant technology stacks and methodologies
- Include industry benchmarks where applicable`;
}

// -----------------------------------------------------------------------------
// User Prompt
// -----------------------------------------------------------------------------

function buildProposalUserPrompt(input: ProposalInput): string {
  const { client, selectedServices, estimatedBudget, timeline, specialRequirements, tone } = input;

  const sections = [
    `Generate a comprehensive business proposal with the following details:`,
    '',
    formatClientContext(client),
    '',
    formatServicesContext(selectedServices),
    '',
    formatBudgetContext(estimatedBudget),
    '',
    `TIMELINE: ${timeline || 'Suggest an appropriate timeline based on scope'}`,
    `TONE: ${tone || 'professional'}`,
    `DATE: ${currentDateISO()}`,
  ];

  if (specialRequirements && specialRequirements.length > 0) {
    sections.push('', 'SPECIAL REQUIREMENTS:');
    specialRequirements.forEach((req, i) => sections.push(`  ${i + 1}. ${req}`));
  }

  if (input.includeContractClauses) {
    sections.push('', 'ADDITIONAL: Include 3-5 industry-appropriate contract clauses.');
  }

  if (input.includeUpsells) {
    sections.push('', 'ADDITIONAL: Suggest 2-3 upsell opportunities with revenue impact estimates.');
  }

  sections.push(jsonOutputInstructions(`{
  "coverPage": {
    "title": "string — main proposal title",
    "subtitle": "string — package/offering name",
    "clientName": "string",
    "date": "string (YYYY-MM-DD)"
  },
  "companyIntroduction": "string — 2-3 sentence compelling intro",
  "problemStatement": "string — the client's challenge",
  "proposedSolution": "string — your proposed approach",
  "deliverables": [
    {
      "name": "string — deliverable name",
      "description": "string — what's included",
      "icon": "string — Material Symbols icon name (e.g. 'language', 'campaign', 'trending_up')"
    }
  ],
  "timeline": [
    {
      "phase": "number",
      "name": "string — phase name",
      "duration": "string — e.g. 'Week 1-2'",
      "startWeek": "number",
      "endWeek": "number",
      "deliverables": ["string"],
      "description": "string"
    }
  ],
  "pricingTable": {
    "lineItems": [
      {
        "id": "string",
        "description": "string",
        "quantity": "number",
        "unitPrice": "number",
        "total": "number"
      }
    ],
    "subtotal": "number",
    "tax": "number",
    "total": "number",
    "paymentSchedule": "string (optional)"
  },
  "contractClauses": [ ... ] (if requested),
  "upsellSuggestions": [ ... ] (if requested),
  "callToAction": "string — closing statement encouraging the client to proceed"
}`));

  return sections.join('\n');
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Builds the complete message array for proposal generation.
 */
export function buildProposalMessages(input: ProposalInput): ChatMessage[] {
  return [
    { role: 'system', content: buildProposalSystemPrompt() },
    { role: 'user', content: buildProposalUserPrompt(input) },
  ];
}
