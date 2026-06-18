import type {
  QuotationInput,
  GeneratedQuotation,
  AIResponse
} from '../types';
import { OpenAIService } from './openai.service';
import { buildQuotationMessages } from '../prompts/quotation.prompt';
import {
  validateQuotationInput,
  validateQuotationOutput
} from '../validators';

export class QuotationService {
  private openaiService: OpenAIService;

  constructor(openaiService?: OpenAIService) {
    this.openaiService = openaiService || new OpenAIService();
  }

  /**
   * Generates a detailed price quotation with optional pricing tiers
   */
  async generateQuotation(
    input: QuotationInput,
    options?: any
  ): Promise<AIResponse<GeneratedQuotation>> {
    try {
      // 1. Validate Input
      const validatedInput = validateQuotationInput(input);

      // 2. Build Messages
      const messages = buildQuotationMessages(validatedInput);

      // 3. Call OpenAI Service
      const response = await this.openaiService.structuredOutput<GeneratedQuotation>(
        messages,
        options
      );

      if (!response.success) {
        return response;
      }

      // 4. Validate Output
      const validatedOutput = validateQuotationOutput(response.data);

      return {
        ...response,
        data: validatedOutput,
      };
    } catch (e: any) {
      return {
        success: false,
        data: null as unknown as GeneratedQuotation,
        metadata: {
          model: options?.model || 'gpt-4o',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          latencyMs: 0,
          timestamp: new Date().toISOString(),
          requestId: `err-${Math.random().toString(36).substring(2, 11)}`,
          mockMode: options?.mockMode ?? false,
        },
        error: {
          code: 'QUOTATION_GENERATION_FAILED',
          message: e.message || 'An error occurred during quotation generation.',
          details: e,
        },
      };
    }
  }
}
