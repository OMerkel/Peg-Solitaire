import {
  BOARD_LAYOUTS,
  PEG_SETS,
  SHAPE,
  SHAPE_SELECTION,
  SVG_NS,
} from "./common.js";
import {
  applyMove,
  countPegs,
  createBoardState,
  getLegalMovesFrom,
  removeInitialPeg,
} from "./board.js";
import { getSolutionLength, getSolutionStep, solutionNames } from "./solver.js";

const START_PEG_COUNT = {
  [SHAPE.TRIANGULAR5]: PEG_SETS[SHAPE.TRIANGULAR5].ids.length,
  [SHAPE.TRIANGULAR6]: PEG_SETS[SHAPE.TRIANGULAR6].ids.length,
  [SHAPE.ENGLISH]: PEG_SETS[SHAPE.ENGLISH].ids.length,
  [SHAPE.FRENCH]: PEG_SETS[SHAPE.FRENCH].ids.length,
};

const createSvg = (tag) => document.createElementNS(SVG_NS, tag);

const clearChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const readCheckedRadioId = () => {
  const input = document.querySelector("input[name='boardShape']:checked");
  return input ? input.id : "boardTriangular5";
};

const getShapeFromSelection = () => SHAPE_SELECTION[readCheckedRadioId()] ?? SHAPE.TRIANGULAR5;

const getSolutionFromSelection = () => {
  const selected = readCheckedRadioId();
  return solutionNames.includes(selected) ? selected : "";
};

const hideElement = (element, hidden) => {
  if (hidden) {
    element.classList.add("is-hidden");
  } else {
    element.classList.remove("is-hidden");
  }
};

export const initHmi = () => {
  const svg = document.querySelector("#board");
  const newButton = document.querySelector("#new");
  const stepButton = document.querySelector("#step");

  const ui = {
    pegNodes: [],
    holeNodes: [],
    removeNodes: [],
    targetNodes: [],
    hitNodes: [],
  };

  let boardState = createBoardState(SHAPE.TRIANGULAR5);
  let selectedPegId = null;
  let activeSolutionName = "";
  let playbackIndex = 0;

  const updateBoardSize = () => {
    const offsetWidth = 64;
    const offsetHeight = 180;
    const innerWidth = window.innerWidth - offsetWidth;
    const innerHeight = window.innerHeight - offsetHeight;
    const boardSize = Math.max(320, Math.min(innerWidth, innerHeight));
    svg.setAttribute("width", String(boardSize));
    svg.setAttribute("height", String(boardSize));
  };

  const resetSvg = () => {
    clearChildren(svg);
    svg.setAttribute("viewBox", "-10 -10 1020 1020");

    const bg = createSvg("circle");
    bg.setAttribute("cx", "500");
    bg.setAttribute("cy", "500");
    bg.setAttribute("r", "500");
    bg.setAttribute("fill", "#aaaaaa");
    bg.setAttribute("stroke", "#666666");
    bg.setAttribute("stroke-width", "20");
    svg.appendChild(bg);
  };

  const renderShape = () => {
    resetSvg();

    ui.pegNodes = [];
    ui.holeNodes = [];
    ui.removeNodes = [];
    ui.targetNodes = [];
    ui.hitNodes = [];

    const layout = BOARD_LAYOUTS[boardState.shapeId];

    layout.points.forEach((point, index) => {
      const hole = createSvg("circle");
      hole.setAttribute("cx", String(point.x));
      hole.setAttribute("cy", String(point.y));
      hole.setAttribute("r", "24");
      hole.setAttribute("fill", "#333333");
      hole.setAttribute("stroke", "#000000");
      hole.setAttribute("stroke-width", "3");
      svg.appendChild(hole);

      const peg = createSvg("circle");
      peg.setAttribute("cx", String(point.x));
      peg.setAttribute("cy", String(point.y));
      peg.setAttribute("r", String(72 * layout.size));
      peg.setAttribute("fill", "#d45a12");
      peg.setAttribute("stroke", "#000000");
      peg.setAttribute("stroke-width", "4");
      svg.appendChild(peg);

      const remove = createSvg("text");
      remove.setAttribute("x", String(point.x));
      remove.setAttribute("y", String(point.y + 12));
      remove.setAttribute("text-anchor", "middle");
      remove.setAttribute("font-size", String(80 * layout.size));
      remove.setAttribute("font-weight", "700");
      remove.setAttribute("fill", "#9a0000");
      remove.textContent = "x";
      remove.style.visibility = "hidden";
      svg.appendChild(remove);

      const target = createSvg("circle");
      target.setAttribute("cx", String(point.x));
      target.setAttribute("cy", String(point.y));
      target.setAttribute("r", String(82 * layout.size));
      target.setAttribute("fill", "none");
      target.setAttribute("stroke", "#ff9100");
      target.setAttribute("stroke-width", "8");
      target.setAttribute("stroke-dasharray", "10 8");
      target.style.visibility = "hidden";
      svg.appendChild(target);

      const hit = createSvg("circle");
      hit.setAttribute("cx", String(point.x));
      hit.setAttribute("cy", String(point.y));
      hit.setAttribute("r", String(80 * layout.size));
      hit.setAttribute("fill", "transparent");
      hit.style.cursor = "pointer";
      hit.addEventListener("click", () => performByIndex(index));
      svg.appendChild(hit);

      ui.holeNodes.push(hole);
      ui.pegNodes.push(peg);
      ui.removeNodes.push(remove);
      ui.targetNodes.push(target);
      ui.hitNodes.push(hit);
    });

    updateBoardSize();
  };

  const redraw = () => {
    const ids = PEG_SETS[boardState.shapeId].ids;

    ids.forEach((id, index) => {
      const visible = boardState.pegs[id];
      ui.pegNodes[index].style.visibility = visible ? "visible" : "hidden";
      ui.pegNodes[index].setAttribute("stroke-width", selectedPegId === id ? "10" : "4");
      ui.removeNodes[index].style.visibility = "hidden";
      ui.targetNodes[index].style.visibility = "hidden";
    });

    if (selectedPegId === null) {
      return;
    }

    const legalMoves = getLegalMovesFrom(boardState, selectedPegId);
    legalMoves.forEach((move) => {
      ui.removeNodes[move.overIndex].style.visibility = "visible";
      ui.targetNodes[move.toIndex].style.visibility = "visible";
    });
  };

  const clearSelection = () => {
    selectedPegId = null;
  };

  const shouldRemoveInitialPeg = () => countPegs(boardState) === START_PEG_COUNT[boardState.shapeId];

  const selectPegIfMovable = (pegId) => {
    const hasMoves = getLegalMovesFrom(boardState, pegId).length > 0;
    selectedPegId = hasMoves ? pegId : null;
  };

  const performByIndex = (index) => {
    const pegId = PEG_SETS[boardState.shapeId].ids[index];

    if (shouldRemoveInitialPeg()) {
      boardState = removeInitialPeg(boardState, pegId);
      clearSelection();
      redraw();
      return;
    }

    // Mimic the old code: first try to jump if a peg is selected, then try to select
    if (selectedPegId !== null) {
      // A peg is already selected; try to jump to pegId
      const legalMoves = getLegalMovesFrom(boardState, selectedPegId);
      const selectedMove = legalMoves.find((move) => move.to === pegId);
      if (selectedMove) {
        // Valid jump found
        boardState = applyMove(boardState, selectedMove);
        // Note: don't clear selection yet; let selectPegIfMovable decide
      }
    }

    // Now attempt to select pegId (if there's a peg there that can jump)
    // This mimics the old Board.prototype.select() behavior
    selectPegIfMovable(pegId);

    redraw();
  };

  const updateStepVisibility = () => {
    const hasSolution = activeSolutionName !== "";
    hideElement(stepButton, !hasSolution);
  };

  const newGame = () => {
    boardState = createBoardState(getShapeFromSelection());
    activeSolutionName = getSolutionFromSelection();
    playbackIndex = 0;
    clearSelection();
    renderShape();
    redraw();
    updateStepVisibility();
  };

  const showNextSolutionStep = () => {
    if (!activeSolutionName) {
      return;
    }

    const nextIndex = getSolutionStep(activeSolutionName, playbackIndex);
    if (nextIndex === null) {
      hideElement(stepButton, true);
      return;
    }

    performByIndex(nextIndex);
    playbackIndex += 1;

    if (playbackIndex >= getSolutionLength(activeSolutionName)) {
      hideElement(stepButton, true);
    }
  };

  newButton.addEventListener("click", newGame);
  stepButton.addEventListener("click", showNextSolutionStep);
  window.addEventListener("resize", updateBoardSize);

  newGame();
};
