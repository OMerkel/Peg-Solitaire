import { PEG_SETS, findIndex } from "./common.js";

const clonePegs = (pegs) => ({ ...pegs });

export const createBoardState = (shapeId) => {
  const ids = PEG_SETS[shapeId].ids;
  const pegs = Object.fromEntries(ids.map((id) => [id, true]));
  return { shapeId, pegs };
};

export const countPegs = (state) => Object.values(state.pegs).filter(Boolean).length;

export const hasPeg = (state, pegId) => Boolean(state.pegs[pegId]);

export const getIds = (shapeId) => PEG_SETS[shapeId].ids;

export const getDirections = (shapeId) => PEG_SETS[shapeId].directions;

export const getLegalMovesFrom = (state, fromId) => {
  if (!hasPeg(state, fromId)) {
    return [];
  }

  const ids = getIds(state.shapeId);
  const directions = getDirections(state.shapeId);

  return directions
    .map((direction, directionIndex) => {
      const over = fromId + direction;
      const to = over + direction;
      const toIndex = findIndex(ids, to);
      const overIndex = findIndex(ids, over);

      if (toIndex === -1 || overIndex === -1) {
        return null;
      }

      const canJump = hasPeg(state, over) && !hasPeg(state, to);
      if (!canJump) {
        return null;
      }

      return {
        from: fromId,
        over,
        to,
        fromIndex: findIndex(ids, fromId),
        overIndex,
        toIndex,
        directionIndex,
      };
    })
    .filter((move) => move !== null);
};

export const getLegalMoves = (state) => {
  const ids = getIds(state.shapeId);
  return ids.flatMap((id) => getLegalMovesFrom(state, id));
};

export const removeInitialPeg = (state, pegId) => {
  const next = clonePegs(state.pegs);
  next[pegId] = false;
  return { ...state, pegs: next };
};

export const applyMove = (state, move) => {
  const next = clonePegs(state.pegs);
  next[move.from] = false;
  next[move.over] = false;
  next[move.to] = true;
  return { ...state, pegs: next };
};
