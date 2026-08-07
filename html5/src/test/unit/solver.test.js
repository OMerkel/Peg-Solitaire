import { describe, expect, it } from "vitest";

import {
  SOLUTIONS,
  getSolutionLength,
  getSolutionStep,
  solutionNames,
} from "../../js/solver.js";

describe("solver data", () => {
  it("exports non-empty solution names", () => {
    expect(solutionNames.length).toBeGreaterThan(0);
  });

  it("keeps lengths in sync", () => {
    for (const name of solutionNames) {
      expect(getSolutionLength(name)).toBe(SOLUTIONS[name].length);
    }

    expect(getSolutionLength("missing")).toBe(0);
  });

  it("returns null for invalid lookups", () => {
    expect(getSolutionStep("missing", 0)).toBeNull();
    expect(getSolutionStep(solutionNames[0], -1)).toBeNull();
    expect(getSolutionStep(solutionNames[0], getSolutionLength(solutionNames[0]))).toBeNull();
  });

  it("returns all valid solution steps", () => {
    for (const name of solutionNames) {
      const length = getSolutionLength(name);
      for (let i = 0; i < length; i += 1) {
        expect(getSolutionStep(name, i)).toBeTypeOf("number");
      }
    }
  });
});
