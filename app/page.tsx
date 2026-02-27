"use client";

import { useMemo, useState } from "react";

type ExtractedContext = {
  hasClearGoal: boolean;
  hasDefinedConstraints: boolean;
  hasDeterministicLogic: boolean;
  hasHumanOverride: boolean;
  hasTestCases: boolean;
};

type EvaluateResponse =
  | {
      ok: true;
      result: {
        ruleResults: Array<{
          ruleId: string;
          severity: string;
          triggered: boolean;
          reasoning: string;
        }>;
        highestSeverity: string;
        decisionState: string;
        reasoningTrace: string[];
      };
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
        issues: Array<{ path: Array<string | number>; message: string }>;
      };
    };

const DEFAULT_STATE: ExtractedContext = {
  hasClearGoal: true,
  hasDefinedConstraints: true,
  hasDeterministicLogic: true,
  hasHumanOverride: true,
  hasTestCases: true,
};

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        border: "1px solid #ddd",
        borderRadius: 999,
        fontSize: 12,
        lineHeight: "16px",
      }}
    >
      {text}
    </span>
  );
}

export default function HomePage() {
  const [ctx, setCtx] = useState<ExtractedContext>(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<EvaluateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const payload = useMemo(() => JSON.stringify(ctx, null, 2), [ctx]);

  async function onSubmit() {
    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ctx),
      });

      const json = (await r.json()) as EvaluateResponse;
      setResp(json);
    } catch (e: any) {
      setResp(null);
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function toggle<K extends keyof ExtractedContext>(key: K) {
    setCtx((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 6 }}>
        Autonomy Readiness Checker
      </h1>
      <div style={{ color: "#555", marginBottom: 18 }}>
        Governance-first MVP · LLM extracts, rules decide, human retains authority
      </div>

      <section
        style={{
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: 16, margin: "0 0 12px 0" }}>Context inputs</h2>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={ctx.hasClearGoal}
            onChange={() => toggle("hasClearGoal")}
          />{" "}
          hasClearGoal
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={ctx.hasDefinedConstraints}
            onChange={() => toggle("hasDefinedConstraints")}
          />{" "}
          hasDefinedConstraints
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={ctx.hasDeterministicLogic}
            onChange={() => toggle("hasDeterministicLogic")}
          />{" "}
          hasDeterministicLogic
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={ctx.hasHumanOverride}
            onChange={() => toggle("hasHumanOverride")}
          />{" "}
          hasHumanOverride
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={ctx.hasTestCases}
            onChange={() => toggle("hasTestCases")}
          />{" "}
          hasTestCases
        </label>

        <button
          onClick={onSubmit}
          disabled={loading}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: loading ? "#f5f5f5" : "white",
            color: "#111", // ✅ FIX: prevent white-on-white in dark theme
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Evaluating..." : "Evaluate"}
        </button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <h2 style={{ fontSize: 16, margin: "0 0 12px 0" }}>
            Request payload
          </h2>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            {payload}
          </pre>
        </div>

        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <h2 style={{ fontSize: 16, margin: "0 0 12px 0" }}>Response</h2>

          {error && (
            <div style={{ color: "crimson", marginBottom: 10 }}>{error}</div>
          )}

          {!resp && !error && (
            <div style={{ color: "#666" }}>
              Click <b>Evaluate</b> to see the deterministic output.
            </div>
          )}

          {resp && resp.ok && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <Badge text={`decisionState: ${resp.result.decisionState}`} />
              <Badge text={`highestSeverity: ${resp.result.highestSeverity}`} />
            </div>
          )}

          {resp && !resp.ok && (
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <Badge text={`error: ${resp.error.code}`} />
            </div>
          )}

          {resp && (
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              {JSON.stringify(resp, null, 2)}
            </pre>
          )}
        </div>
      </section>
    </main>
  );
}