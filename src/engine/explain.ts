import type { ZodIssue } from "zod";

/**
 * Deterministic mapping of Zod issues into stable output.
 */
export function mapZodIssues(issues: ZodIssue[]) {
  return issues.map((i) => ({
    path: i.path,
    message: i.message,
  }));
}