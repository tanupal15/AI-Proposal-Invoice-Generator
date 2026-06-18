// =============================================================================
// AI Integration Layer — Configuration
// =============================================================================
// Central configuration for AI model parameters, feature flags, and
// per-document-type generation settings.
// =============================================================================

import type { OpenAIConfig, OpenAIModel, GenerationOptions } from './types';

// -----------------------------------------------------------------------------
// Default Configuration
// -----------------------------------------------------------------------------

/** Default OpenAI configuration — uses mock mode when no API key is set */
export const DEFAULT_OPENAI_CONFIG: OpenAIConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 4096,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

/** Whether to run in mock mode (no real API calls) */
export const IS_MOCK_MODE = !process.env.OPENAI_API_KEY;

// -----------------------------------------------------------------------------
// Per-Document-Type Generation Defaults
// -----------------------------------------------------------------------------

/**
 * Optimal generation parameters tuned for each document type.
 * Lower temperature = more deterministic (invoices, contracts).
 * Higher temperature = more creative (proposals, upsells).
 */
export const GENERATION_DEFAULTS: Record<string, GenerationOptions> = {
  proposal: {
    model: 'gpt-4o',
    temperature: 0.75,
    maxTokens: 6000,
    mockDelay: 1500,
  },
  quotation: {
    model: 'gpt-4o',
    temperature: 0.5,
    maxTokens: 3000,
    mockDelay: 800,
  },
  invoice: {
    model: 'gpt-4o-mini',
    temperature: 0.3,
    maxTokens: 2000,
    mockDelay: 600,
  },
  scopeOfWork: {
    model: 'gpt-4o',
    temperature: 0.6,
    maxTokens: 5000,
    mockDelay: 1200,
  },
  contractClause: {
    model: 'gpt-4o',
    temperature: 0.4,
    maxTokens: 4000,
    mockDelay: 1000,
  },
  upsell: {
    model: 'gpt-4o',
    temperature: 0.8,
    maxTokens: 3000,
    mockDelay: 700,
  },
};

// -----------------------------------------------------------------------------
// Model Catalog
// -----------------------------------------------------------------------------

/** Available models with their capabilities */
export const MODEL_CATALOG: Record<OpenAIModel, { name: string; contextWindow: number; costPer1kTokens: number }> = {
  'gpt-4o': {
    name: 'GPT-4o',
    contextWindow: 128000,
    costPer1kTokens: 0.005,
  },
  'gpt-4o-mini': {
    name: 'GPT-4o Mini',
    contextWindow: 128000,
    costPer1kTokens: 0.00015,
  },
  'gpt-4-turbo': {
    name: 'GPT-4 Turbo',
    contextWindow: 128000,
    costPer1kTokens: 0.01,
  },
  'gpt-3.5-turbo': {
    name: 'GPT-3.5 Turbo',
    contextWindow: 16385,
    costPer1kTokens: 0.0005,
  },
};

// -----------------------------------------------------------------------------
// Feature Flags
// -----------------------------------------------------------------------------

export const FEATURES = {
  /** Enable tiered pricing in quotations */
  TIERED_PRICING: true,
  /** Enable AI upsell suggestions in proposals */
  UPSELL_SUGGESTIONS: true,
  /** Enable AI contract clause generation in proposals */
  CONTRACT_CLAUSES: true,
  /** Enable industry-specific prompt customization */
  INDUSTRY_PROMPTS: true,
  /** Enable verbose logging of AI requests/responses */
  VERBOSE_LOGGING: process.env.NODE_ENV === 'development',
  /** Maximum number of retry attempts for failed API calls */
  MAX_RETRIES: 3,
} as const;

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

/**
 * Merges user-provided generation options with per-document defaults.
 * User options take precedence over defaults.
 */
export function resolveOptions(
  documentType: string,
  userOptions?: GenerationOptions,
): GenerationOptions {
  const defaults = GENERATION_DEFAULTS[documentType] || GENERATION_DEFAULTS.proposal;
  return {
    ...defaults,
    ...userOptions,
    mockMode: userOptions?.mockMode ?? IS_MOCK_MODE,
  };
}
