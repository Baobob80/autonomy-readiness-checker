import type { ZodIssue } from "zod";

/**
 * Deterministic mapping of Zod issues to our API-safe shape.
 * IMPORTANT: ZodIssue.path is (string | number | symbol)[], but our public schema
 * only allows (string | number)[]. We stringify symbols deterministically.
 */
export function mapZodIssues(
  issues: ZodIssue[]
): { path: (string | number)[]; message: string }[] {
  return issues.map((i) => ({
    path: i.path.map((p) => (typeof p === "symbol" ? String(p) : p)),
    message: i.message,
  }));
}