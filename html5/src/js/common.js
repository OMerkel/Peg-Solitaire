//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

function Common() {}

Common.ONTO = 'onto';
Common.OVER = 'over';
Common.SHAPE = 'shape';
Common.PEGS = 'pegs';
Common.SELECTED = 'selected';

Common.SHAPETRIANGULAR5 = 0;
Common.SHAPETRIANGULAR6 = 1;
Common.SHAPEENGLISH = 2;
Common.SHAPEFRENCH = 3;
Common.PEG = [
{
  ID: [
    62,
    52, 53,
    42, 43, 44,
    32, 33, 34, 35,
    22, 23, 24, 25, 26
  ],
  DIRECTION: [ 9, 10, 1, -9, -10, -1 ]
},
{
  ID: [
    72,
    62, 63,
    52, 53, 54,
    42, 43, 44, 45,
    32, 33, 34, 35, 36,
    22, 23, 24, 25, 26, 27
  ],
  DIRECTION: [ 9, 10, 1, -9, -10, -1 ]
},
{
  ID: [  
            84, 85, 86,
            74, 75, 76,
    62, 63, 64, 65, 66, 67, 68,
    52, 53, 54, 55, 56, 57, 58,
    42, 43, 44, 45, 46, 47, 48,
            34, 35, 36,
            24, 25, 26
  ],
  DIRECTION: [ 10, 1, -10, -1 ]
},
{
  ID: [  
            84, 85, 86,
        73, 74, 75, 76, 77,
    62, 63, 64, 65, 66, 67, 68,
    52, 53, 54, 55, 56, 57, 58,
    42, 43, 44, 45, 46, 47, 48,
        33, 34, 35, 36, 37,
            24, 25, 26
  ],
  DIRECTION: [ 10, 1, -10, -1 ]
},
];

Common.inArray = function( e, a ) {
  var elementFound = -1;
  for(var i=0; i<a.length && -1 == elementFound; ++i) {
    elementFound = e == a[i] ? i : -1;
  }
  return elementFound;
}
