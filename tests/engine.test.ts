import { describe, it, expect } from "vitest";
import { evaluate } from "../src/engine/evaluate";

describe("Deterministic Engine Evaluation (boundary-safe)", () => {
  const baseContext = {
    hasClearGoal: true,
    hasDefinedConstraints: true,
    hasDeterministicLogic: true,
    hasHumanOverride: true,
    hasTestCases: true,
  };

  it("returns READY when all conditions satisfied", () => {
    const res = evaluate(baseContext);

    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.schemaVersion).toBeDefined();
    expect(res.result.highestSeverity).toBe("NONE");
    expect(res.result.decisionState).toBe("READY");
  });

  it("returns NOT_READY when a BLOCKER exists", () => {
    const res = evaluate({ ...baseContext, hasClearGoal: false });

    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.result.highestSeverity).toBe("BLOCKER");
    expect(res.result.decisionState).toBe("NOT_READY");
  });

  it("returns BORDERLINE when only WARN exists", () => {
    const res = evaluate({ ...baseContext, hasTestCases: false });

    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.result.highestSeverity).toBe("WARN");
    expect(res.result.decisionState).toBe("BORDERLINE");
  });

  it("returns deterministic validation error for invalid input", () => {
    const res = evaluate({ hasClearGoal: "yes" });

    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.schemaVersion).toBeDefined();
    expect(res.error.code).toBe("INVALID_INPUT");
    expect(res.error.issues.length).toBeGreaterThan(0);
  });

  it("STRICT: rejects unknown fields deterministically", () => {
    const res = evaluate({ ...baseContext, extra: true });

    expect(res.ok).toBe(false);
    if (res.ok) return;

    expect(res.error.code).toBe("INVALID_INPUT");
    expect(res.error.issues.length).toBeGreaterThan(0);
  });

  it("idempotence: same input -> same output", () => {
    const a = evaluate(baseContext);
    const b = evaluate(baseContext);

    expect(a).toEqual(b);
  });
});