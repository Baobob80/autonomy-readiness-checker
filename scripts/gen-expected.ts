import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate } from "../src/engine/evaluate";

const fixturesPath = resolve(process.cwd(), "fixtures", "fixtures.json");
const expectedPath = resolve(process.cwd(), "fixtures", "expected.json");

const fixtures = JSON.parse(readFileSync(fixturesPath, "utf-8"));

const expected = fixtures.map((f: any) => ({
  id: f.id,
  output: evaluate(f.input),
}));

writeFileSync(expectedPath, JSON.stringify(expected, null, 2));

console.log("expected.json regenerated successfully.");