import type {
  InvoiceInput,
  GeneratedInvoice,
  AIResponse
} from '../types';
import { OpenAIService } from './openai.service';
import { buildInvoiceMessages } from '../prompts/invoice.prompt';
import {
  validateInvoiceInput,
  validateInvoiceOutput
} from '../validators';

export class InvoiceService {
  private openaiService: OpenAIService;

  constructor(openaiService?: OpenAIService) {
    this.openaiService = openaiService || new OpenAIService();
  }

  /**
   * Generates a structured invoice from client information and line items
   */
  async generateInvoice(
    input: InvoiceInput,
    options?: any
  ): Promise<AIResponse<GeneratedInvoice>> {
    try {
      // 1. Validate Input
      const validatedInput = validateInvoiceInput(input);

      // 2. Build Messages
      const messages = buildInvoiceMessages(validatedInput);

      // 3. Call OpenAI Service
      const response = await this.openaiService.structuredOutput<GeneratedInvoice>(
        messages,
        options
      );

      if (!response.success) {
        return response;
      }

      // 4. Validate Output
      const validatedOutput = validateInvoiceOutput(response.data);

      return {
        ...response,
        data: validatedOutput,
      };
    } catch (e: any) {
      return {
        success: false,
        data: null as unknown as GeneratedInvoice,
        metadata: {
          model: options?.model || 'gpt-4o-mini',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          latencyMs: 0,
          timestamp: new Date().toISOString(),
          requestId: `err-${Math.random().toString(36).substring(2, 11)}`,
          mockMode: options?.mockMode ?? false,
        },
        error: {
          code: 'INVOICE_GENERATION_FAILED',
          message: e.message || 'An error occurred during invoice generation.',
          details: e,
        },
      };
    }
  }
}
