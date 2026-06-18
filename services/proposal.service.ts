import type {
  ProposalInput,
  GeneratedProposal,
  ScopeOfWorkInput,
  GeneratedScopeOfWork,
  AIResponse
} from '../types';
import { OpenAIService } from './openai.service';
import { buildProposalMessages } from '../prompts/proposal.prompt';
import { buildScopeOfWorkMessages } from '../prompts/scope-of-work.prompt';
import {
  validateProposalInput,
  validateProposalOutput,
  validateScopeOfWorkInput,
  validateScopeOfWorkOutput
} from '../validators';

export class ProposalService {
  private openaiService: OpenAIService;

  constructor(openaiService?: OpenAIService) {
    this.openaiService = openaiService || new OpenAIService();
  }

  /**
   * Generates a complete business proposal based on client info and selected services
   */
  async generateProposal(
    input: ProposalInput,
    options?: any
  ): Promise<AIResponse<GeneratedProposal>> {
    try {
      // 1. Validate Input
      const validatedInput = validateProposalInput(input);

      // 2. Build Messages
      const messages = buildProposalMessages(validatedInput);

      // 3. Call OpenAI Service
      const response = await this.openaiService.structuredOutput<GeneratedProposal>(
        messages,
        options
      );

      if (!response.success) {
        return response;
      }

      // 4. Validate Output
      const validatedOutput = validateProposalOutput(response.data);

      return {
        ...response,
        data: validatedOutput,
      };
    } catch (e: any) {
      return {
        success: false,
        data: null as unknown as GeneratedProposal,
        metadata: {
          model: options?.model || 'gpt-4o',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          latencyMs: 0,
          timestamp: new Date().toISOString(),
          requestId: `err-${Math.random().toString(36).substring(2, 11)}`,
          mockMode: options?.mockMode ?? false,
        },
        error: {
          code: 'PROPOSAL_GENERATION_FAILED',
          message: e.message || 'An error occurred during proposal generation.',
          details: e,
        },
      };
    }
  }

  /**
   * Generates a Scope of Work (SOW) document linked to the selected services
   */
  async generateScopeOfWork(
    input: ScopeOfWorkInput,
    options?: any
  ): Promise<AIResponse<GeneratedScopeOfWork>> {
    try {
      // 1. Validate Input
      const validatedInput = validateScopeOfWorkInput(input);

      // 2. Build Messages
      const messages = buildScopeOfWorkMessages(validatedInput);

      // 3. Call OpenAI Service
      const response = await this.openaiService.structuredOutput<GeneratedScopeOfWork>(
        messages,
        options
      );

      if (!response.success) {
        return response;
      }

      // 4. Validate Output
      const validatedOutput = validateScopeOfWorkOutput(response.data);

      return {
        ...response,
        data: validatedOutput,
      };
    } catch (e: any) {
      return {
        success: false,
        data: null as unknown as GeneratedScopeOfWork,
        metadata: {
          model: options?.model || 'gpt-4o',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          latencyMs: 0,
          timestamp: new Date().toISOString(),
          requestId: `err-${Math.random().toString(36).substring(2, 11)}`,
          mockMode: options?.mockMode ?? false,
        },
        error: {
          code: 'SOW_GENERATION_FAILED',
          message: e.message || 'An error occurred during Scope of Work generation.',
          details: e,
        },
      };
    }
  }
}
