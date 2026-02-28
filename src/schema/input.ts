import { z } from "zod";

/**
 * Canonical input schema for the rule engine boundary.
 * No throw policy is handled by caller (safeParse).
 *
 * STRICT mode: unknown fields are rejected.
 */
export const ExtractedContextSchema = z
  .object({
    hasClearGoal: z.boolean(),
    hasDefinedConstraints: z.boolean(),
    hasDeterministicLogic: z.boolean(),
    hasHumanOverride: z.boolean(),
    hasTestCases: z.boolean(),
  })
  .strict();

export type ExtractedContextInput = z.infer<typeof ExtractedContextSchema>;