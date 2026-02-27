import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate } from "../src/engine/evaluate";

type Fixture = {
  id: string;
  input: unknown;
};

type Expected = {
  id: string;
  output: unknown;
};

describe("Deterministic Regression — fixtures", () => {
  const fixturesPath = resolve(process.cwd(), "fixtures", "fixtures.json");
  const expectedPath = resolve(process.cwd(), "fixtures", "expected.json");

  const fixtures: Fixture[] = JSON.parse(readFileSync(fixturesPath, "utf-8"));
  const expected: Expected[] = JSON.parse(readFileSync(expectedPath, "utf-8"));

  it("matches expected output exactly (deep equality)", () => {
    const actual = fixtures.map((f) => ({
      id: f.id,
      output: evaluate(f.input),
    }));

    expect(actual).toEqual(expected);
  });
});