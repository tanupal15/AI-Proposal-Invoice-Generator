import { ScopeOfWorkInputSchema, GeneratedScopeOfWorkSchema } from '../schemas';
import type { ScopeOfWorkInput, GeneratedScopeOfWork } from '../types';

/**
 * Validates ScopeOfWorkInput against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateScopeOfWorkInput(data: unknown): ScopeOfWorkInput {
  const result = ScopeOfWorkInputSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid ScopeOfWorkInput: ${result.error.message}`);
  }
  return result.data;
}

/**
 * Validates GeneratedScopeOfWork (AI Output) against its Zod schema.
 * Throws an error with validation messages if validation fails.
 */
export function validateScopeOfWorkOutput(data: unknown): GeneratedScopeOfWork {
  const result = GeneratedScopeOfWorkSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid GeneratedScopeOfWork AI Output: ${result.error.message}`);
  }
  return result.data;
}
