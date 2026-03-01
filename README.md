# Autonomy Readiness Checker

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

## ⚙️ Tech Stack

- Next.js 16
- TypeScript
- Zod
- Vitest
- Pure functional rule engine

---

## 🚀 Local Development

Clone the repository:

```bash
git clone https://github.com/baobob80/autonomy-readiness-checker.git
cd autonomy-readiness-checker