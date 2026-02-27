import { ExtractedContext, RuleResult } from "./types";

/**
 * Deterministic rule helpers
 */

function makeResult(
  ruleId: RuleResult["ruleId"],
  triggered: boolean,
  severity: RuleResult["severity"],
  reasoning: string
): RuleResult {
  return {
    ruleId,
    triggered,
    severity,
    reasoning,
  };
}

/**
 * R1 – Clear goal required
 */
export function R1(ctx: ExtractedContext): RuleResult {
  const triggered = !ctx.hasClearGoal;

  return makeResult(
    "R1",
    triggered,
    triggered ? "BLOCKER" : "NONE",
    triggered
      ? "No clearly defined goal."
      : "Clear goal present."
  );
}

/**
 * R2 – Constraints must be defined
 */
export function R2(ctx: ExtractedContext): RuleResult {
  const triggered = !ctx.hasDefinedConstraints;

  return makeResult(
    "R2",
    triggered,
    triggered ? "BLOCKER" : "NONE",
    triggered
      ? "Constraints not explicitly defined."
      : "Constraints defined."
  );
}

/**
 * R3 – Deterministic logic required
 */
export function R3(ctx: ExtractedContext): RuleResult {
  const triggered = !ctx.hasDeterministicLogic;

  return makeResult(
    "R3",
    triggered,
    triggered ? "BLOCKER" : "NONE",
    triggered
      ? "System lacks deterministic logic."
      : "Deterministic logic confirmed."
  );
}

/**
 * R4 – Human override required
 */
export function R4(ctx: ExtractedContext): RuleResult {
  const triggered = !ctx.hasHumanOverride;

  return makeResult(
    "R4",
    triggered,
    triggered ? "BLOCKER" : "NONE",
    triggered
      ? "No human override mechanism."
      : "Human override present."
  );
}

/**
 * R5 – Test cases required
 */
export function R5(ctx: ExtractedContext): RuleResult {
  const triggered = !ctx.hasTestCases;

  return makeResult(
    "R5",
    triggered,
    triggered ? "WARN" : "NONE",
    triggered
      ? "No test cases defined."
      : "Test cases defined."
  );
}

/**
 * R6–R9 placeholders (future expansion)
 */

export function R6(): RuleResult {
  return makeResult("R6", false, "NONE", "Reserved.");
}

export function R7(): RuleResult {
  return makeResult("R7", false, "NONE", "Reserved.");
}

export function R8(): RuleResult {
  return makeResult("R8", false, "NONE", "Reserved.");
}

export function R9(): RuleResult {
  return makeResult("R9", false, "NONE", "Reserved.");
}