export const SOLUTIONS = Object.freeze({
  boardEnglishSolution: Object.freeze([
    16, 4, 16, 7, 9, 0, 8, 2, 0, 15, 3, 0, 8, 9, 7, 17, 15,
    5, 17, 6, 8, 15, 3, 13, 15, 22, 8, 20, 22, 3, 15, 12, 10, 17, 5, 19,
    17, 24, 10, 26, 24, 5, 17, 23, 21, 30, 22, 15, 27, 32, 30, 22, 21, 23,
    28, 16, 18, 29, 17, 18, 16,
  ]),
  boardEnglishHeartSolution: Object.freeze([
    16, 4, 16, 7, 9, 0, 8, 2, 0, 15, 3, 0, 8, 27, 15,
    20, 22, 6, 20, 23, 21, 20, 22, 25, 23, 32, 24, 30, 32, 17, 29, 32, 24, 5,
    17, 12, 10, 26, 12, 9, 11, 12, 10, 23, 21, 7, 9, 11, 25, 23, 16, 14,
    28, 16, 17, 15, 14, 16,
  ]),
  boardTriangular5CornerSolution: Object.freeze([
    0, 3, 0, 5, 3, 0, 5, 9, 2, 12, 5, 0, 10,
    12, 6, 1, 0, 3, 13, 11, 3, 12, 11, 13, 14, 12,
  ]),
  boardTriangular5MidEdgeSolution: Object.freeze([
    3, 0, 3, 6, 1, 5, 3, 1, 6, 14, 5, 2, 9,
    13, 4, 11, 13, 10, 3, 12, 14, 5, 3,
  ]),
  boardTriangular5EdgeSolution: Object.freeze([
    1, 6, 1, 12, 3, 10, 12, 1, 6, 9, 7, 12,
    3, 6, 1, 8, 14, 12, 2, 9, 12, 5, 9, 2, 0, 5,
  ]),
  boardTriangular5InnerSolution: Object.freeze([
    4, 13, 4, 11, 13, 6, 8, 9, 7, 2, 9, 1,
    6, 14, 5, 3, 6, 1, 0, 3, 12, 13, 11, 10, 12,
  ]),
  boardTriangular6Solution: Object.freeze([
    3, 0, 3, 6, 1, 15, 6, 5, 0, 3, 10, 12, 3,
    14, 12, 5, 14, 17, 15, 6, 1, 8, 20, 9, 7, 16, 19, 17, 15,
  ]),
  boardTriangular6FinalLongSweepSolution: Object.freeze([
    3, 0, 3, 6, 1, 15, 6, 12, 3, 10,
    12, 18, 7, 5, 12, 14, 5, 0, 3, 20, 18, 17, 8, 6, 1, 8, 19, 17, 15,
  ]),
  boardFrench1Solution: Object.freeze([
    11, 1, 11, 3, 5, 17, 4, 0, 10, 30, 17, 4, 32, 30,
    34, 24, 19, 17, 30, 6, 19, 32, 4, 6, 2, 12, 36, 34, 24, 33,
    31, 28, 26, 15, 17, 30, 32, 19, 6, 14, 12, 7, 5, 8, 10, 22,
    24, 21, 19, 6, 4, 17, 30, 29, 31, 18, 11, 25,
  ]),
  boardFrench2Solution: Object.freeze([
    0, 2, 0, 11, 1, 9, 11, 24, 10, 34, 24, 19, 17, 30,
    7, 5, 18, 21, 19, 6, 3, 5, 22, 24, 33, 20, 14, 12, 25, 27, 13, 11, 9, 8,
    10, 0, 2, 12, 36, 26, 35, 25, 27, 29, 31, 15, 17, 19, 6, 4, 17, 30,
    32, 28, 26, 36,
  ]),
});

export const solutionNames = Object.keys(SOLUTIONS);

export const getSolutionStep = (solutionName, index) => {
  const steps = SOLUTIONS[solutionName];
  if (!steps || index < 0 || index >= steps.length) {
    return null;
  }
  return steps[index];
};

export const getSolutionLength = (solutionName) => {
  const steps = SOLUTIONS[solutionName];
  return steps ? steps.length : 0;
};
