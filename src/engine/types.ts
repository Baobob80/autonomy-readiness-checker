// Canonical domain types for Autonomy Readiness Checker
// Deterministic, framework-agnostic

export type RuleID =
  | "R1"
  | "R2"
  | "R3"
  | "R4"
  | "R5"
  | "R6"
  | "R7"
  | "R8"
  | "R9";

export type Severity =
  | "NONE"
  | "INFO"
  | "WARN"
  | "BLOCKER";

export type DecisionState =
  | "NOT_READY"
  | "BORDERLINE"
  | "READY";

export interface ExtractedContext {
  hasClearGoal: boolean;
  hasDefinedConstraints: boolean;
  hasDeterministicLogic: boolean;
  hasHumanOverride: boolean;
  hasTestCases: boolean;
}

export interface RuleResult {
  ruleId: RuleID;
  severity: Severity;
  triggered: boolean;
  reasoning: string;
}

export interface EvaluationResult {
  ruleResults: RuleResult[];
  highestSeverity: Severity;
  decisionState: DecisionState;
  reasoningTrace: string[];
}