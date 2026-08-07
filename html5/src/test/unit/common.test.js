import { describe, expect, it } from "vitest";

import {
  BOARD_LAYOUTS,
  PEG_SETS,
  SHAPE,
  SHAPE_SELECTION,
  findIndex,
} from "../../js/common.js";

describe("common constants", () => {
  it("maps all supported board selection ids", () => {
    expect(SHAPE_SELECTION.boardTriangular5).toBe(SHAPE.TRIANGULAR5);
    expect(SHAPE_SELECTION.boardTriangular6).toBe(SHAPE.TRIANGULAR6);
    expect(SHAPE_SELECTION.boardEnglish).toBe(SHAPE.ENGLISH);
    expect(SHAPE_SELECTION.boardFrench).toBe(SHAPE.FRENCH);
    expect(SHAPE_SELECTION.boardEnglishSolution).toBe(SHAPE.ENGLISH);
    expect(SHAPE_SELECTION.boardFrench2Solution).toBe(SHAPE.FRENCH);
  });

  it("keeps layout and peg set sizes aligned per shape", () => {
    expect(BOARD_LAYOUTS.length).toBe(PEG_SETS.length);
    for (let i = 0; i < BOARD_LAYOUTS.length; i += 1) {
      expect(BOARD_LAYOUTS[i].points.length).toBe(PEG_SETS[i].ids.length);
    }
  });

  it("findIndex returns index or -1", () => {
    const values = [42, 7, 99];
    expect(findIndex(values, 7)).toBe(1);
    expect(findIndex(values, -1)).toBe(-1);
  });
});
