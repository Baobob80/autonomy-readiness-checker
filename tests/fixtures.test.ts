import { describe, it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate } from "../src/engine/evaluate";
import type { ExtractedContext } from "../src/engine/types";

type Fixture = {
  id: string;
  input: ExtractedContext;
};

describe("Generate expected.json (ONE TIME ONLY)", () => {
  it("writes expected.json from engine output", () => {
    const fixturesPath = resolve(process.cwd(), "fixtures", "fixtures.json");
    const expectedPath = resolve(process.cwd(), "fixtures", "expected.json");

    const fixtures: Fixture[] = JSON.parse(
      readFileSync(fixturesPath, "utf-8")
    );

    const expected = fixtures.map((f) => ({
      id: f.id,
      output: evaluate(f.input),
    }));

    writeFileSync(expectedPath, JSON.stringify(expected, null, 2) + "\n");
  });
});