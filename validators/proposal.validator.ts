import { ProposalInputSchema, GeneratedProposalSchema } from '../schemas';
import type { ProposalInput, GeneratedProposal } from '../types';

/**
 * Validates ProposalInput against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateProposalInput(data: unknown): ProposalInput {
  const result = ProposalInputSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid ProposalInput: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}

/**
 * Validates GeneratedProposal (AI Output) against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateProposalOutput(data: unknown): GeneratedProposal {
  const result = GeneratedProposalSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid GeneratedProposal AI Output: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
  }
  return result.data;
}
