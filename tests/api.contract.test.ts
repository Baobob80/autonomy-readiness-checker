import { describe, it, expect } from "vitest";
import { evaluate } from "../src/engine/evaluate";
import { EvaluateResponseSchema, SCHEMA_VERSION } from "../src/schema/output";

describe("API contract (engine boundary)", () => {
  const baseContext = {
    hasClearGoal: true,
    hasDefinedConstraints: true,
    hasDeterministicLogic: true,
    hasHumanOverride: true,
    hasTestCases: true,
  };

  it("matches EvaluateResponseSchema and stable contract shape", () => {
    const res = evaluate(baseContext);

    // Schema validity (hard gate)
    const parsed = EvaluateResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);

    // Stable contract snapshot (avoid noisy fields)
    if (!res.ok) throw new Error("Expected ok=true for baseContext");

    const contract = {
      ok: res.ok,
      schemaVersion: res.schemaVersion,
      decisionState: res.result.decisionState,
      highestSeverity: res.result.highestSeverity,
      ruleResults: res.result.ruleResults.map((r) => ({
        ruleId: r.ruleId,
        severity: r.severity,
        triggered: r.triggered,
      })),
    };

    expect(res.schemaVersion).toBe(SCHEMA_VERSION);
    expect(contract).toMatchSnapshot();
  });
});