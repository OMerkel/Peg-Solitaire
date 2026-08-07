//
// Copyright (c) 2016, 2026 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

export const SHAPE = Object.freeze({
  TRIANGULAR5: 0,
  TRIANGULAR6: 1,
  ENGLISH: 2,
  FRENCH: 3,
});

export const SVG_NS = "http://www.w3.org/2000/svg";

export const PEG_SETS = Object.freeze([
  Object.freeze({
    ids: Object.freeze([
      62,
      52, 53,
      42, 43, 44,
      32, 33, 34, 35,
      22, 23, 24, 25, 26,
    ]),
    directions: Object.freeze([-1, 9, 10, 1, -9, -10]),
  }),
  Object.freeze({
    ids: Object.freeze([
      72,
      62, 63,
      52, 53, 54,
      42, 43, 44, 45,
      32, 33, 34, 35, 36,
      22, 23, 24, 25, 26, 27,
    ]),
    directions: Object.freeze([-1, 9, 10, 1, -9, -10]),
  }),
  Object.freeze({
    ids: Object.freeze([
      84, 85, 86,
      74, 75, 76,
      62, 63, 64, 65, 66, 67, 68,
      52, 53, 54, 55, 56, 57, 58,
      42, 43, 44, 45, 46, 47, 48,
      34, 35, 36,
      24, 25, 26,
    ]),
    directions: Object.freeze([-1, 10, 1, -10]),
  }),
  Object.freeze({
    ids: Object.freeze([
      84, 85, 86,
      73, 74, 75, 76, 77,
      62, 63, 64, 65, 66, 67, 68,
      52, 53, 54, 55, 56, 57, 58,
      42, 43, 44, 45, 46, 47, 48,
      33, 34, 35, 36, 37,
      24, 25, 26,
    ]),
    directions: Object.freeze([-1, 10, 1, -10]),
  }),
]);

export const BOARD_LAYOUTS = Object.freeze([
  Object.freeze({
    size: 1,
    pegScale: 1,
    hintScale: 1.65,
    points: Object.freeze([
      Object.freeze({ x: 500, y: 100 }),
      Object.freeze({ x: 413, y: 250 }), Object.freeze({ x: 586, y: 250 }),
      Object.freeze({ x: 327, y: 400 }), Object.freeze({ x: 500, y: 400 }), Object.freeze({ x: 673, y: 400 }),
      Object.freeze({ x: 240, y: 550 }), Object.freeze({ x: 413, y: 550 }),
      Object.freeze({ x: 586, y: 550 }), Object.freeze({ x: 759, y: 550 }),
      Object.freeze({ x: 154, y: 700 }), Object.freeze({ x: 327, y: 700 }),
      Object.freeze({ x: 500, y: 700 }), Object.freeze({ x: 673, y: 700 }), Object.freeze({ x: 846, y: 700 }),
    ]),
  }),
  Object.freeze({
    size: 0.86,
    pegScale: 0.8,
    hintScale: 1.65,
    points: Object.freeze([
      Object.freeze({ x: 500, y: 100 }),
      Object.freeze({ x: 431, y: 220 }), Object.freeze({ x: 569, y: 220 }),
      Object.freeze({ x: 362, y: 340 }), Object.freeze({ x: 500, y: 340 }), Object.freeze({ x: 638, y: 340 }),
      Object.freeze({ x: 292, y: 460 }), Object.freeze({ x: 431, y: 460 }),
      Object.freeze({ x: 569, y: 460 }), Object.freeze({ x: 708, y: 460 }),
      Object.freeze({ x: 223, y: 580 }), Object.freeze({ x: 362, y: 580 }), Object.freeze({ x: 500, y: 580 }),
      Object.freeze({ x: 638, y: 580 }), Object.freeze({ x: 777, y: 580 }),
      Object.freeze({ x: 154, y: 700 }), Object.freeze({ x: 292, y: 700 }), Object.freeze({ x: 431, y: 700 }),
      Object.freeze({ x: 569, y: 700 }), Object.freeze({ x: 708, y: 700 }), Object.freeze({ x: 846, y: 700 }),
    ]),
  }),
  Object.freeze({
    size: 0.75,
    pegScale: 0.75,
    hintScale: 1.65,
    points: Object.freeze([
      Object.freeze({ x: 370, y: 110 }), Object.freeze({ x: 500, y: 110 }), Object.freeze({ x: 630, y: 110 }),
      Object.freeze({ x: 370, y: 240 }), Object.freeze({ x: 500, y: 240 }), Object.freeze({ x: 630, y: 240 }),
      Object.freeze({ x: 110, y: 370 }), Object.freeze({ x: 240, y: 370 }), Object.freeze({ x: 370, y: 370 }),
      Object.freeze({ x: 500, y: 370 }), Object.freeze({ x: 630, y: 370 }), Object.freeze({ x: 760, y: 370 }), Object.freeze({ x: 890, y: 370 }),
      Object.freeze({ x: 110, y: 500 }), Object.freeze({ x: 240, y: 500 }), Object.freeze({ x: 370, y: 500 }),
      Object.freeze({ x: 500, y: 500 }), Object.freeze({ x: 630, y: 500 }), Object.freeze({ x: 760, y: 500 }), Object.freeze({ x: 890, y: 500 }),
      Object.freeze({ x: 110, y: 630 }), Object.freeze({ x: 240, y: 630 }), Object.freeze({ x: 370, y: 630 }),
      Object.freeze({ x: 500, y: 630 }), Object.freeze({ x: 630, y: 630 }), Object.freeze({ x: 760, y: 630 }), Object.freeze({ x: 890, y: 630 }),
      Object.freeze({ x: 370, y: 760 }), Object.freeze({ x: 500, y: 760 }), Object.freeze({ x: 630, y: 760 }),
      Object.freeze({ x: 370, y: 890 }), Object.freeze({ x: 500, y: 890 }), Object.freeze({ x: 630, y: 890 }),
    ]),
  }),
  Object.freeze({
    size: 0.75,
    pegScale: 0.75,
    hintScale: 1.65,
    points: Object.freeze([
      Object.freeze({ x: 370, y: 110 }), Object.freeze({ x: 500, y: 110 }), Object.freeze({ x: 630, y: 110 }),
      Object.freeze({ x: 240, y: 240 }), Object.freeze({ x: 370, y: 240 }), Object.freeze({ x: 500, y: 240 }),
      Object.freeze({ x: 630, y: 240 }), Object.freeze({ x: 760, y: 240 }),
      Object.freeze({ x: 110, y: 370 }), Object.freeze({ x: 240, y: 370 }), Object.freeze({ x: 370, y: 370 }),
      Object.freeze({ x: 500, y: 370 }), Object.freeze({ x: 630, y: 370 }), Object.freeze({ x: 760, y: 370 }), Object.freeze({ x: 890, y: 370 }),
      Object.freeze({ x: 110, y: 500 }), Object.freeze({ x: 240, y: 500 }), Object.freeze({ x: 370, y: 500 }),
      Object.freeze({ x: 500, y: 500 }), Object.freeze({ x: 630, y: 500 }), Object.freeze({ x: 760, y: 500 }), Object.freeze({ x: 890, y: 500 }),
      Object.freeze({ x: 110, y: 630 }), Object.freeze({ x: 240, y: 630 }), Object.freeze({ x: 370, y: 630 }),
      Object.freeze({ x: 500, y: 630 }), Object.freeze({ x: 630, y: 630 }), Object.freeze({ x: 760, y: 630 }), Object.freeze({ x: 890, y: 630 }),
      Object.freeze({ x: 240, y: 760 }), Object.freeze({ x: 370, y: 760 }), Object.freeze({ x: 500, y: 760 }),
      Object.freeze({ x: 630, y: 760 }), Object.freeze({ x: 760, y: 760 }),
      Object.freeze({ x: 370, y: 890 }), Object.freeze({ x: 500, y: 890 }), Object.freeze({ x: 630, y: 890 }),
    ]),
  }),
]);

export const SHAPE_SELECTION = Object.freeze({
  boardTriangular5: SHAPE.TRIANGULAR5,
  boardTriangular5CornerSolution: SHAPE.TRIANGULAR5,
  boardTriangular5MidEdgeSolution: SHAPE.TRIANGULAR5,
  boardTriangular5EdgeSolution: SHAPE.TRIANGULAR5,
  boardTriangular5InnerSolution: SHAPE.TRIANGULAR5,
  boardTriangular6: SHAPE.TRIANGULAR6,
  boardTriangular6Solution: SHAPE.TRIANGULAR6,
  boardTriangular6FinalLongSweepSolution: SHAPE.TRIANGULAR6,
  boardEnglish: SHAPE.ENGLISH,
  boardEnglishSolution: SHAPE.ENGLISH,
  boardEnglishHeartSolution: SHAPE.ENGLISH,
  boardFrench: SHAPE.FRENCH,
  boardFrench1Solution: SHAPE.FRENCH,
  boardFrench2Solution: SHAPE.FRENCH,
});

export const findIndex = (values, target) => values.indexOf(target);
