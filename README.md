# Autonomy Readiness Checker
## Problem

Most AI systems evaluate capability.

Far fewer evaluate governance readiness.

Autonomy Readiness Checker evaluates whether a system demonstrates the minimum governance conditions required before autonomy should be considered.

The architecture intentionally separates:

- extraction
- evaluation
- authority

LLM extracts.

Rules decide.

Humans retain final authority.
## Live Demo

https://autonomy-readiness-checker.vercel.app

Governance-first deterministic engine for evaluating AI autonomy readiness.

---

## 🎯 Purpose

Autonomy Readiness Checker demonstrates a strict, deterministic evaluation model
for AI systems and agentic architectures.

It enforces separation between:

- Extraction layer (LLM or structured input)
- Rule-based decision authority
- Human final authority

The system intentionally avoids:

- Hidden heuristics
- Implicit autonomy
- Silent fallbacks
- Non-deterministic behavior

---

## 🧠 Architecture

Client → API Route → STRICT Zod Schema → Pure Rule Engine → Deterministic Output

Core principles:

- STRICT input validation (`.strict()` mode)
- Versioned output schema (`schemaVersion`)
- Deterministic rule evaluation (R1–R9)
- Snapshot-based API contract validation
- Idempotent results
- No database
- No stored user data
- No implicit AI decisions

---

mermaid
flowchart TD

A[Context Input]
--> B[Extraction Layer]

B --> C[Governance Signals]

C --> D[Deterministic Rule Engine]

D --> E[Admissibility Decision]

E --> F[Human Authority]

F --> G[Final Output]

G --> H[Audit Record]

---

## ⚙️ Tech Stack

- Next.js 16
- TypeScript
- Zod
- Vitest
- Pure functional rule engine

---

## 🚀 Local Development

---

## Evidence

Current verified state:

- Replay Determinism Verified
- Topology Integrity Verified
- Human Authority Boundary Verified
- Governance Stability Verified

Current operating mode:

- ERA 2 Locked
- Pressure Phase Active
- Architecture Evolution Not Justified

The project remains in evidence collection mode rather than architecture expansion mode.

Clone the repository:

```bash
git clone https://github.com/baobob80/autonomy-readiness-checker.git
cd autonomy-readiness-checker
