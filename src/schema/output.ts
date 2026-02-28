import { z } from "zod";

export const SCHEMA_VERSION = "1.0.0" as const;

export const SeveritySchema = z.enum(["NONE", "INFO", "WARN", "BLOCKER"]);
export const DecisionStateSchema = z.enum(["NOT_READY", "BORDERLINE", "READY"]);
export const RuleIdSchema = z.enum(["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"]);

export const RuleResultSchema = z.object({
  ruleId: RuleIdSchema,
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

export const ErrorCodeSchema = z.enum(["INVALID_INPUT", "INVALID_JSON"]);

export const ValidationErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  issues: z.array(
    z.object({
      path: z.array(z.union([z.string(), z.number()])),
      message: z.string(),
    })
  ),
});

export const EvaluateResponseSchema = z.union([
  z.object({
    ok: z.literal(true),
    schemaVersion: z.literal(SCHEMA_VERSION),
    result: EvaluationResultSchema,
  }),
  z.object({
    ok: z.literal(false),
    schemaVersion: z.literal(SCHEMA_VERSION),
    error: ValidationErrorSchema,
  }),
]);

export type EvaluateResponse = z.infer<typeof EvaluateResponseSchema>;