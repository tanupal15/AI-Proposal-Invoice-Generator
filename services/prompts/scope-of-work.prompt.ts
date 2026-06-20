// =============================================================================
// Scope of Work Prompt Templates
// =============================================================================
// System and user prompts for generating detailed Scope of Work documents
// with phases, deliverables, acceptance criteria, and project governance.
// =============================================================================

import type { ScopeOfWorkInput, ChatMessage } from '../../types';
import {
  buildBaseSystemPrompt,
  formatClientContext,
  formatServicesContext,
  jsonOutputInstructions,
  currentDateISO,
} from './shared.prompt';

// -----------------------------------------------------------------------------
// System Prompt
// -----------------------------------------------------------------------------

function buildScopeOfWorkSystemPrompt(): string {
  return `${buildBaseSystemPrompt()}

ROLE-SPECIFIC INSTRUCTIONS:
You are a project management expert specializing in creating detailed Scope of Work documents that prevent scope creep and set clear expectations.

SOW PRINCIPLES:node
- Be explicit about what IS and IS NOT included
- Define measurable acceptance criteria for every deliverable
- Create realistic timelines with buffer for review cycles
- Identify assumptions and constraints proactively
- Include change management processes
- Define communication cadence and escalation paths`;
}

// -----------------------------------------------------------------------------
// User Prompt
// -----------------------------------------------------------------------------

function buildScopeOfWorkUserPrompt(input: ScopeOfWorkInput): string {
  const { client, selectedServices, projectObjectives, constraints, assumptions, startDate, totalWeeks, teamSize } = input;

  const sections = [
    `Generate a comprehensive Scope of Work document with the following details:`,
    '',
    formatClientContext(client),
    '',
    formatServicesContext(selectedServices),
    '',
    `PROJECT START DATE: ${startDate || currentDateISO()}`,
    `TOTAL DURATION: ${totalWeeks ? `${totalWeeks} weeks` : 'Suggest appropriate duration'}`,
    `TEAM SIZE: ${teamSize ? `${teamSize} members` : 'Suggest appropriate team size'}`,
    '',
    'PROJECT OBJECTIVES:',
  ];

  projectObjectives.forEach((obj, i) => {
    sections.push(`  ${i + 1}. ${obj}`);
  });

  if (constraints && constraints.length > 0) {
    sections.push('', 'KNOWN CONSTRAINTS:');
    constraints.forEach((c, i) => sections.push(`  ${i + 1}. ${c}`));
  }

  if (assumptions && assumptions.length > 0) {
    sections.push('', 'ASSUMPTIONS:');
    assumptions.forEach((a, i) => sections.push(`  ${i + 1}. ${a}`));
  }

  sections.push(jsonOutputInstructions(`{
  "projectTitle": "string",
  "projectOverview": "string — 2-3 paragraph overview",
  "objectives": ["string"],
  "scope": {
    "inScope": ["string — specific items included"],
    "outOfScope": ["string — explicit exclusions"]
  },
  "deliverables": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "acceptanceCriteria": ["string"],
      "estimatedHours": "number",
      "dependencies": ["string (optional)"],
      "phase": "number"
    }
  ],
  "timeline": [
    {
      "phase": "number",
      "name": "string",
      "duration": "string",
      "startWeek": "number",
      "endWeek": "number",
      "deliverables": ["string"],
      "description": "string"
    }
  ],
  "assumptions": ["string"],
  "constraints": ["string"],
  "acceptanceCriteria": ["string — project-level acceptance criteria"],
  "changeManagement": "string — process for handling scope changes",
  "communicationPlan": "string — meeting cadence, channels, stakeholders"
}`));

  return sections.join('\n');
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Builds the complete message array for scope of work generation.
 */
export function buildScopeOfWorkMessages(input: ScopeOfWorkInput): ChatMessage[] {
  return [
    { role: 'system', content: buildScopeOfWorkSystemPrompt() },
    { role: 'user', content: buildScopeOfWorkUserPrompt(input) },
  ];
}
