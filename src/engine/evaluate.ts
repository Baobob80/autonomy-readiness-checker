import type { ExtractedContext } from "./types";
import type { EvaluateResponse } from "../schema/output";

import { ExtractedContextSchema } from "../schema/input";
import { EvaluateResponseSchema, SCHEMA_VERSION } from "../schema/output";
import { mapZodIssues } from "./explain";

import { EvaluationResult, RuleResult, Severity, DecisionState } from "./types";
import { R1, R2, R3, R4, R5, R6, R7, R8, R9 } from "./rules";

/**
 * Severity ranking for deterministic comparison
 */
const severityRank: Record<Severity, number> = {
  NONE: 0,
  INFO: 1,
  WARN: 2,
  BLOCKER: 3,
};

/**
 * Strictest severity wins
 */
function getHighestSeverity(results: RuleResult[]): Severity {
  return results.reduce((highest, current) => {
    return severityRank[current.severity] > severityRank[highest]
      ? current.severity
      : highest;
  }, "NONE" as Severity);
}

/**
 * Deterministic decision derivation
 */
function deriveDecisionState(severity: Severity): DecisionState {
  switch (severity) {
    case "BLOCKER":
      return "NOT_READY";
    case "WARN":
      return "BORDERLINE";
    case "INFO":
    case "NONE":
      return "READY";
    default:
      return "NOT_READY";
  }
}

/**
 * Pure engine evaluation (requires validated input).
 */
function evaluatePure(ctx: ExtractedContext): EvaluationResult {
  const ruleResults: RuleResult[] = [
    R1(ctx),
    R2(ctx),
    R3(ctx),
    R4(ctx),
    R5(ctx),
    R6(),
    R7(),
    R8(),
    R9(),
  ];

  const highestSeverity = getHighestSeverity(ruleResults);
  const decisionState = deriveDecisionState(highestSeverity);

  const reasoningTrace = ruleResults.map(
    (r) => `${r.ruleId}: ${r.reasoning} (severity: ${r.severity})`
  );

  return {
    ruleResults,
    highestSeverity,
    decisionState,
    reasoningTrace,
  };
}

/**
 * Boundary-safe evaluation (NO THROW).
 * Accepts unknown input and returns deterministic result or deterministic validation error.
 */
export function evaluate(input: unknown): EvaluateResponse {
  const parsed = ExtractedContextSchema.safeParse(input);

  if (!parsed.success) {
    const res: EvaluateResponse = {
      ok: false,
      schemaVersion: SCHEMA_VERSION,
      error: {
        code: "INVALID_INPUT",
        message: "Input does not match ExtractedContext schema.",
        issues: mapZodIssues(parsed.error.issues),
      },
    };

    // Internal sanity check (dev-time guard, no throw for callers):
    EvaluateResponseSchema.parse(res);
    return res;
  }

  const res: EvaluateResponse = {
    ok: true,
    schemaVersion: SCHEMA_VERSION,
    result: evaluatePure(parsed.data),
  };

  // Internal sanity check (dev-time guard):
  EvaluateResponseSchema.parse(res);
  return res;
}