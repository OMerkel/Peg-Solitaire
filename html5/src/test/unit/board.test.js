import { describe, expect, it } from "vitest";

import {
  applyMove,
  countPegs,
  createBoardState,
  getDirections,
  getIds,
  getLegalMoves,
  getLegalMovesFrom,
  hasPeg,
  removeInitialPeg,
} from "../../js/board.js";
import { SHAPE } from "../../js/common.js";

describe("board domain", () => {
  it("creates a full board for each shape", () => {
    const shapes = [SHAPE.TRIANGULAR5, SHAPE.TRIANGULAR6, SHAPE.ENGLISH, SHAPE.FRENCH];

    for (const shape of shapes) {
      const state = createBoardState(shape);
      expect(state.shapeId).toBe(shape);
      expect(countPegs(state)).toBe(getIds(shape).length);
    }
  });

  it("returns stable board metadata", () => {
    expect(getIds(SHAPE.TRIANGULAR5).length).toBe(15);
    expect(getDirections(SHAPE.TRIANGULAR5)).toEqual([-1, 9, 10, 1, -9, -10]);
    expect(getDirections(SHAPE.ENGLISH)).toEqual([-1, 10, 1, -10]);
  });

  it("can remove initial peg immutably", () => {
    const state = createBoardState(SHAPE.TRIANGULAR5);
    const id = getIds(SHAPE.TRIANGULAR5)[0];

    const next = removeInitialPeg(state, id);

    expect(next).not.toBe(state);
    expect(next.pegs).not.toBe(state.pegs);
    expect(hasPeg(state, id)).toBe(true);
    expect(hasPeg(next, id)).toBe(false);
    expect(countPegs(next)).toBe(countPegs(state) - 1);
  });

  it("returns no legal moves from empty or invalid source", () => {
    const state = createBoardState(SHAPE.TRIANGULAR5);
    const next = removeInitialPeg(state, getIds(SHAPE.TRIANGULAR5)[0]);

    expect(getLegalMovesFrom(next, 9999)).toEqual([]);
    expect(getLegalMovesFrom(next, getIds(SHAPE.TRIANGULAR5)[0])).toEqual([]);
  });

  it("finds legal moves after first removal", () => {
    const state = createBoardState(SHAPE.TRIANGULAR5);
    const withHole = removeInitialPeg(state, 24);

    const allMoves = getLegalMoves(withHole);
    expect(allMoves.length).toBeGreaterThan(0);

    for (const move of allMoves) {
      expect(move.from).toBeTypeOf("number");
      expect(move.over).toBeTypeOf("number");
      expect(move.to).toBeTypeOf("number");
      expect(move.fromIndex).toBeGreaterThanOrEqual(0);
      expect(move.overIndex).toBeGreaterThanOrEqual(0);
      expect(move.toIndex).toBeGreaterThanOrEqual(0);
      expect(move.directionIndex).toBeGreaterThanOrEqual(0);
    }
  });

  it("applies a legal move immutably and updates peg counts", () => {
    const state = createBoardState(SHAPE.ENGLISH);
    const withHole = removeInitialPeg(state, 55);
    const moves = getLegalMoves(withHole);

    expect(moves.length).toBeGreaterThan(0);
    const next = applyMove(withHole, moves[0]);

    expect(next).not.toBe(withHole);
    expect(next.pegs).not.toBe(withHole.pegs);
    expect(countPegs(next)).toBe(countPegs(withHole) - 1);
    expect(hasPeg(next, moves[0].from)).toBe(false);
    expect(hasPeg(next, moves[0].over)).toBe(false);
    expect(hasPeg(next, moves[0].to)).toBe(true);
  });

  it("can chain multiple legal moves", () => {
    let state = removeInitialPeg(createBoardState(SHAPE.TRIANGULAR6), 33);
    const initialCount = countPegs(state);

    for (let i = 0; i < 3; i += 1) {
      const moves = getLegalMoves(state);
      expect(moves.length).toBeGreaterThan(0);
      state = applyMove(state, moves[0]);
    }

    expect(countPegs(state)).toBe(initialCount - 3);
  });
});
