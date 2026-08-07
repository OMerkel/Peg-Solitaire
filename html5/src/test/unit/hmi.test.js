import { beforeEach, describe, expect, it } from "vitest";

import { getLegalMovesFrom, removeInitialPeg } from "../../js/board.js";
import { PEG_SETS, SHAPE } from "../../js/common.js";
import { initHmi } from "../../js/hmi.js";
import { getSolutionLength } from "../../js/solver.js";

const createDom = () => {
  document.body.innerHTML = `
    <div id="tabs">
      <ul>
        <li><a href="#tabs-board">Board</a></li>
        <li><a href="#tabs-options">Options</a></li>
        <li><a href="#tabs-about">About</a></li>
      </ul>
      <div id="tabs-board" class="is-active">
        <svg id="board"></svg>
        <button id="new" type="button">New</button>
        <button id="step" class="is-hidden" type="button">Step</button>
      </div>
      <div id="tabs-options">
        <input type="radio" name="boardShape" id="boardTriangular5" checked>
        <input type="radio" name="boardShape" id="boardEnglishSolution">
        <input type="radio" name="boardShape" id="boardTriangular5MidEdgeSolution">
      </div>
      <div id="tabs-about"></div>
    </div>
  `;
};

const visiblePegCount = () =>
  Array.from(document.querySelectorAll("#board circle[fill='#d45a12']")).filter(
    (node) => node.style.visibility !== "hidden",
  ).length;

const hiddenPegCount = () =>
  Array.from(document.querySelectorAll("#board circle[fill='#d45a12']")).filter(
    (node) => node.style.visibility === "hidden",
  ).length;

const clickHit = (index) => {
  const node = document.querySelectorAll("#board circle[fill='transparent']")[index];
  node?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
};

describe("hmi interactions", () => {
  beforeEach(() => {
    createDom();
    initHmi();
  });

  it("renders default board and hides step button without solution", () => {
    const pegNodes = document.querySelectorAll("#board circle[fill='#d45a12']");
    const hitNodes = document.querySelectorAll("#board circle[fill='transparent']");

    expect(pegNodes.length).toBe(15);
    expect(hitNodes.length).toBe(15);
    expect(document.querySelector("#step")?.classList.contains("is-hidden")).toBe(true);
  });

  it("removes one peg on first click", () => {
    const before = visiblePegCount();
    const firstHitNode = document.querySelector("#board circle[fill='transparent']");
    firstHitNode?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const after = visiblePegCount();

    expect(after).toBe(before - 1);
  });

  it("shows and consumes solution step sequence", () => {
    const solutionRadio = document.querySelector("#boardEnglishSolution");
    solutionRadio?.setAttribute("checked", "checked");
    if (solutionRadio) {
      solutionRadio.checked = true;
    }

    document.querySelector("#new")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const stepButton = document.querySelector("#step");
    expect(stepButton?.classList.contains("is-hidden")).toBe(false);

    const before = visiblePegCount();
    stepButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const after = visiblePegCount();

    expect(after).toBe(before - 1);
  });

  it("updates board size on resize", () => {
    Object.defineProperty(window, "innerWidth", { value: 640, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 900, configurable: true });

    window.dispatchEvent(new Event("resize"));

    const board = document.querySelector("#board");
    const width = Number(board?.getAttribute("width"));
    const height = Number(board?.getAttribute("height"));

    expect(width).toBeGreaterThanOrEqual(320);
    expect(height).toBeGreaterThanOrEqual(320);
  });

  it("ignores step action when no solution is active", () => {
    const before = hiddenPegCount();
    document.querySelector("#step")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    const after = hiddenPegCount();

    expect(after).toBe(before);
  });

  it("does not select pegs that have no legal moves", () => {
    const ids = PEG_SETS[SHAPE.TRIANGULAR5].ids;
    const afterInitialRemoval = removeInitialPeg(
      { shapeId: SHAPE.TRIANGULAR5, pegs: Object.fromEntries(ids.map((id) => [id, true])) },
      ids[0],
    );

    const noMoveIndex = ids.findIndex(
      (id) => afterInitialRemoval.pegs[id] && getLegalMovesFrom(afterInitialRemoval, id).length === 0,
    );

    expect(noMoveIndex).toBeGreaterThanOrEqual(0);

    clickHit(0);
    clickHit(noMoveIndex);

    const selectedCount = Array.from(document.querySelectorAll("#board circle[fill='#d45a12']")).filter(
      (node) => node.getAttribute("stroke-width") === "10",
    ).length;
    expect(selectedCount).toBe(0);
  });

  it("applies a valid jump after selecting a movable peg", () => {
    const ids = PEG_SETS[SHAPE.TRIANGULAR5].ids;
    const base = { shapeId: SHAPE.TRIANGULAR5, pegs: Object.fromEntries(ids.map((id) => [id, true])) };
    const afterInitialRemoval = removeInitialPeg(base, ids[0]);

    let fromIndex = -1;
    let toIndex = -1;
    for (let i = 0; i < ids.length; i += 1) {
      const moves = getLegalMovesFrom(afterInitialRemoval, ids[i]);
      if (moves.length > 0) {
        fromIndex = i;
        toIndex = ids.indexOf(moves[0].to);
        break;
      }
    }

    expect(fromIndex).toBeGreaterThanOrEqual(0);
    expect(toIndex).toBeGreaterThanOrEqual(0);

    clickHit(0);
    clickHit(fromIndex);
    clickHit(toIndex);

    expect(hiddenPegCount()).toBe(2);
  });

  it("hides step button when solution playback is exhausted", () => {
    const solutionRadio = document.querySelector("#boardTriangular5MidEdgeSolution");
    solutionRadio?.setAttribute("checked", "checked");
    if (solutionRadio) {
      solutionRadio.checked = true;
    }

    document.querySelector("#new")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const stepButton = document.querySelector("#step");
    expect(stepButton?.classList.contains("is-hidden")).toBe(false);

    const steps = getSolutionLength("boardTriangular5MidEdgeSolution");
    for (let i = 0; i < steps; i += 1) {
      stepButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }

    expect(stepButton?.classList.contains("is-hidden")).toBe(true);

    stepButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(stepButton?.classList.contains("is-hidden")).toBe(true);
  });
});
