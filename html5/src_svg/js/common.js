//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

function Common() {}

Common.ONTO = 'onto';
Common.OVER = 'over';
Common.PEGS = 'pegs';
Common.SELECTED = 'selected';

Common.ROWS = 5;
Common.PEGSTOTAL = (Common.ROWS * (Common.ROWS + 1)) >> 1;

Common.PEGID = [
  62,
  52, 53,
  42, 43, 44,
  32, 33, 34, 35,
  22, 23, 24, 25, 26 ];
Common.DIRECTION = [ 9, 10, 1, -9, -10, -1 ];

Common.inArray = function( e, a ) {
  var elementFound = -1;
  for(var i=0; i<a.length && -1 == elementFound; ++i) {
    elementFound = e == a[i] ? i : -1;
  }
  return elementFound;
}