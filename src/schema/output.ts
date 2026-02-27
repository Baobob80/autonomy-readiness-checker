import { z } from "zod";

export const SeveritySchema = z.enum(["NONE", "INFO", "WARN", "BLOCKER"]);
export const DecisionStateSchema = z.enum(["NOT_READY", "BORDERLINE", "READY"]);
export const RuleIDSchema = z.enum(["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"]);

export const RuleResultSchema = z.object({
  ruleId: RuleIDSchema,
  severity: SeveritySchema,
  triggered: z.boolean(),
  reasoning: z.string(),
});

export const EvaluationResultSchema = z.object({
  ruleResults: z.array(RuleResultSchema),
  highestSeverity: SeveritySchema,
  decisionState: DecisionStateSchema,
  reasoningTrace: z.array(z.string()),
});

export const ValidationErrorSchema = z.object({
  code: z.literal("INVALID_INPUT"),
  message: z.string(),
  issues: z.array(
    z.object({
      path: z.array(z.union([z.string(), z.number()])),
      message: z.string(),
    })
  ),
});

export const EvaluateResponseSchema = z.union([
  z.object({ ok: z.literal(true), result: EvaluationResultSchema }),
  z.object({ ok: z.literal(false), error: ValidationErrorSchema }),
]);

export type EvaluateResponse = z.infer<typeof EvaluateResponseSchema>;