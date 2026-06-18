import { z } from 'zod';
import { ClientInfoSchema, ServiceItemSchema, DeliverableSchema, TimelinePhaseSchema } from './shared.schema';

/** Input validation schema for Scope of Work */
export const ScopeOfWorkInputSchema = z.object({
  client: ClientInfoSchema,
  selectedServices: z.array(ServiceItemSchema),
  projectObjectives: z.array(z.string()),
  constraints: z.array(z.string()).optional(),
  assumptions: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  totalWeeks: z.number().positive().optional(),
  teamSize: z.number().positive().optional(),
});

/** Output validation schema for generated Scope of Work */
export const GeneratedScopeOfWorkSchema = z.object({
  projectTitle: z.string(),
  projectOverview: z.string(),
  objectives: z.array(z.string()),
  scope: z.object({
    inScope: z.array(z.string()),
    outOfScope: z.array(z.string()),
  }),
  deliverables: z.array(DeliverableSchema),
  timeline: z.array(TimelinePhaseSchema),
  assumptions: z.array(z.string()),
  constraints: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  changeManagement: z.string(),
  communicationPlan: z.string(),
});
