import { describe, it, expect } from "vitest";
import { evaluate } from "../src/engine/evaluate";
import { ExtractedContext } from "../src/engine/types";

describe("Deterministic Engine Evaluation", () => {
  const baseContext: ExtractedContext = {
    hasClearGoal: true,
    hasDefinedConstraints: true,
    hasDeterministicLogic: true,
    hasHumanOverride: true,
    hasTestCases: true,
  };

  it("returns READY when all conditions satisfied", () => {
    const result = evaluate(baseContext);

    expect(result.highestSeverity).toBe("NONE");
    expect(result.decisionState).toBe("READY");
  });

  it("returns NOT_READY when a BLOCKER exists", () => {
    const ctx = { ...baseContext, hasClearGoal: false };

    const result = evaluate(ctx);

    expect(result.highestSeverity).toBe("BLOCKER");
    expect(result.decisionState).toBe("NOT_READY");
  });

  it("returns BORDERLINE when only WARN exists", () => {
    const ctx = { ...baseContext, hasTestCases: false };

    const result = evaluate(ctx);

    expect(result.highestSeverity).toBe("WARN");
    expect(result.decisionState).toBe("BORDERLINE");
  });

  it("BLOCKER overrides WARN", () => {
    const ctx = {
      ...baseContext,
      hasClearGoal: false,
      hasTestCases: false,
    };

    const result = evaluate(ctx);

    expect(result.highestSeverity).toBe("BLOCKER");
    expect(result.decisionState).toBe("NOT_READY");
  });
});