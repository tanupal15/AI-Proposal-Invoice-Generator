import type {
  OpenAIConfig,
  GenerationOptions,
  AIResponse,
  ChatMessage,
  AIServiceInterface
} from '../types';
import { DEFAULT_OPENAI_CONFIG, resolveOptions } from '../config';
import {
  generateMockProposal,
  generateMockInvoice,
  generateMockQuotation,
  generateMockScopeOfWork,
  parsePromptContext
} from './mock-generator';

export class OpenAIService implements AIServiceInterface {
  private config: OpenAIConfig;

  constructor(config?: Partial<OpenAIConfig>) {
    this.config = {
      ...DEFAULT_OPENAI_CONFIG,
      ...config
    };
  }

  /**
   * Helper to simulate network latency for mock mode
   */
  private async simulateLatency(delayMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delayMs));
  }

  /**
   * Helper to clean markdown code blocks (e.g. ```json ... ```) from LLM output
   */
  private cleanJsonResponseText(text: string): string {
    let cleaned = text.trim();
    // Remove markdown code fences if present
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    }
    return cleaned;
  }

  /**
   * Helper to infer the requested document type from prompts context
   */
  private inferDocumentType(messages: ChatMessage[]): 'proposal' | 'invoice' | 'quotation' | 'scopeOfWork' {
    const userMsg = messages.find(m => m.role === 'user')?.content || '';
    const content = userMsg.toLowerCase();

    if (content.includes('coverpage') || (content.includes('proposal') && content.includes('calltoaction'))) {
      return 'proposal';
    }
    if (content.includes('invoice') || content.includes('invoicenumber')) {
      return 'invoice';
    }
    if (content.includes('quotation') || content.includes('quotationnumber') || content.includes('tiers')) {
      return 'quotation';
    }
    if (content.includes('scope of work') || content.includes('projectoverview') || content.includes('inscope')) {
      return 'scopeOfWork';
    }

    return 'proposal'; // Default fallback
  }

  /**
   * Chat completion endpoint client
   */
  async chatCompletion(
    messages: ChatMessage[],
    options?: GenerationOptions
  ): Promise<AIResponse<string>> {
    const resolved = resolveOptions(this.inferDocumentType(messages), options);
    const startTime = Date.now();
    const requestId = `req-${Math.random().toString(36).substring(2, 11)}`;

    // -------------------------------------------------------------------------
    // Mock Mode Fallback
    // -------------------------------------------------------------------------
    if (resolved.mockMode || !this.config.apiKey) {
      const docType = this.inferDocumentType(messages);
      const delay = resolved.mockDelay ?? 1000;
      await this.simulateLatency(delay);

      let mockOutput = '';
      switch (docType) {
        case 'proposal':
          mockOutput = generateMockProposal(messages);
          break;
        case 'invoice':
          mockOutput = generateMockInvoice(messages);
          break;
        case 'quotation':
          mockOutput = generateMockQuotation(messages);
          break;
        case 'scopeOfWork':
          mockOutput = generateMockScopeOfWork(messages);
          break;
      }

      const latencyMs = Date.now() - startTime;
      return {
        success: true,
        data: mockOutput,
        metadata: {
          model: `${resolved.model || this.config.model} (Mock)`,
          tokensUsed: {
            prompt: Math.round(messages.map(m => m.content.length).reduce((a, b) => a + b, 0) / 4),
            completion: Math.round(mockOutput.length / 4),
            total: Math.round((messages.map(m => m.content.length).reduce((a, b) => a + b, 0) + mockOutput.length) / 4),
          },
          latencyMs,
          timestamp: new Date().toISOString(),
          requestId,
          mockMode: true,
        },
      };
    }

    // -------------------------------------------------------------------------
    // Real API Call
    // -------------------------------------------------------------------------
    try {
      const modelName = resolved.model || this.config.model;
      const response = await fetch(
        this.config.baseUrl || 'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`,
            ...(this.config.organizationId ? { 'OpenAI-Organization': this.config.organizationId } : {}),
          },
          body: JSON.stringify({
            model: modelName,
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            temperature: resolved.temperature ?? this.config.temperature,
            max_tokens: resolved.maxTokens ?? this.config.maxTokens,
            response_format: { type: 'json_object' }, // Enforces structured JSON output
          }),
        }
      );

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        return {
          success: false,
          data: '',
          metadata: {
            model: modelName,
            tokensUsed: { prompt: 0, completion: 0, total: 0 },
            latencyMs,
            timestamp: new Date().toISOString(),
            requestId,
            mockMode: false,
          },
          error: {
            code: `API_ERROR_${response.status}`,
            message: errBody?.error?.message || `OpenAI API returned status ${response.status}`,
            details: errBody,
          },
        };
      }

      const responseBody = await response.json();
      const completionText = responseBody.choices?.[0]?.message?.content || '';
      const usage = responseBody.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

      return {
        success: true,
        data: completionText,
        metadata: {
          model: modelName,
          tokensUsed: {
            prompt: usage.prompt_tokens,
            completion: usage.completion_tokens,
            total: usage.total_tokens,
          },
          latencyMs,
          timestamp: new Date().toISOString(),
          requestId,
          mockMode: false,
        },
      };
    } catch (e: any) {
      const latencyMs = Date.now() - startTime;
      return {
        success: false,
        data: '',
        metadata: {
          model: resolved.model || this.config.model,
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          latencyMs,
          timestamp: new Date().toISOString(),
          requestId,
          mockMode: false,
        },
        error: {
          code: 'NETWORK_ERROR',
          message: e.message || 'A network error occurred while communicating with OpenAI.',
          details: e,
        },
      };
    }
  }

  /**
   * Structured output wrapper
   */
  async structuredOutput<T>(
    messages: ChatMessage[],
    options?: GenerationOptions
  ): Promise<AIResponse<T>> {
    const rawResponse = await this.chatCompletion(messages, options);

    if (!rawResponse.success) {
      return {
        success: false,
        data: null as unknown as T,
        metadata: rawResponse.metadata,
        error: rawResponse.error,
      };
    }

    try {
      const cleanedText = this.cleanJsonResponseText(rawResponse.data);
      const parsedData = JSON.parse(cleanedText) as T;

      return {
        success: true,
        data: parsedData,
        metadata: rawResponse.metadata,
      };
    } catch (parseErr: any) {
      return {
        success: false,
        data: null as unknown as T,
        metadata: rawResponse.metadata,
        error: {
          code: 'JSON_PARSE_ERROR',
          message: `Failed to parse OpenAI response as JSON: ${parseErr.message}`,
          details: {
            rawText: rawResponse.data,
            parseError: parseErr,
          },
        },
      };
    }
  }
}
