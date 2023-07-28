//
// Copyright (c) 2016, 2023 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

var hmi;

Hmi.PEG = [
{
  SIZE: 1,
  PEGSCALE: 1,
  HINTSCALE: 1.65,
  LAYOUT: [
    { X: 500, Y: 100 },
    { X: 413, Y: 250 }, { X: 586, Y: 250 },
    { X: 327, Y: 400 }, { X: 500, Y: 400 }, { X: 673, Y: 400 },
    { X: 240, Y: 550 }, { X: 413, Y: 550 },
    { X: 586, Y: 550 }, { X: 759, Y: 550 },
    { X: 154, Y: 700 }, { X: 327, Y: 700 },
    { X: 500, Y: 700 }, { X: 673, Y: 700 }, { X: 846, Y: 700 }
  ]
},
{
  SIZE: 0.86,
  PEGSCALE: 0.80,
  HINTSCALE: 1.65,
  LAYOUT: [
    { X: 500, Y: 100 },
    { X: 431, Y: 220 }, { X: 569, Y: 220 },
    { X: 362, Y: 340 }, { X: 500, Y: 340 }, { X: 638, Y: 340 },
    { X: 292, Y: 460 }, { X: 431, Y: 460 },
    { X: 569, Y: 460 }, { X: 708, Y: 460 },
    { X: 223, Y: 580 }, { X: 362, Y: 580 }, { X: 500, Y: 580 },
    { X: 638, Y: 580 }, { X: 777, Y: 580 },
    { X: 154, Y: 700 }, { X: 292, Y: 700 }, { X: 431, Y: 700 },
    { X: 569, Y: 700 }, { X: 708, Y: 700 }, { X: 846, Y: 700 }
  ]
},
{
  SIZE: 0.75,
  PEGSCALE: 0.75,
  HINTSCALE: 1.65,
  LAYOUT: [
    { X: 370, Y: 110 }, { X: 500, Y: 110 }, { X: 630, Y: 110 },
    { X: 370, Y: 240 }, { X: 500, Y: 240 }, { X: 630, Y: 240 },
    { X: 110, Y: 370 }, { X: 240, Y: 370 }, { X: 370, Y: 370 },
    { X: 500, Y: 370 }, { X: 630, Y: 370 }, { X: 760, Y: 370 }, { X: 890, Y: 370 },
    { X: 110, Y: 500 }, { X: 240, Y: 500 }, { X: 370, Y: 500 },
    { X: 500, Y: 500 }, { X: 630, Y: 500 }, { X: 760, Y: 500 }, { X: 890, Y: 500 },
    { X: 110, Y: 630 }, { X: 240, Y: 630 }, { X: 370, Y: 630 },
    { X: 500, Y: 630 }, { X: 630, Y: 630 }, { X: 760, Y: 630 }, { X: 890, Y: 630 },
    { X: 370, Y: 760 }, { X: 500, Y: 760 }, { X: 630, Y: 760 },
    { X: 370, Y: 890 }, { X: 500, Y: 890 }, { X: 630, Y: 890 }
  ]
},
{
  SIZE: 0.75,
  PEGSCALE: 0.75,
  HINTSCALE: 1.65,
  LAYOUT: [
    { X: 370, Y: 110 }, { X: 500, Y: 110 }, { X: 630, Y: 110 },
    { X: 240, Y: 240 }, { X: 370, Y: 240 }, { X: 500, Y: 240 },
    { X: 630, Y: 240 }, { X: 760, Y: 240 },
    { X: 110, Y: 370 }, { X: 240, Y: 370 }, { X: 370, Y: 370 },
    { X: 500, Y: 370 }, { X: 630, Y: 370 }, { X: 760, Y: 370 }, { X: 890, Y: 370 },
    { X: 110, Y: 500 }, { X: 240, Y: 500 }, { X: 370, Y: 500 },
    { X: 500, Y: 500 }, { X: 630, Y: 500 }, { X: 760, Y: 500 }, { X: 890, Y: 500 },
    { X: 110, Y: 630 }, { X: 240, Y: 630 }, { X: 370, Y: 630 },
    { X: 500, Y: 630 }, { X: 630, Y: 630 }, { X: 760, Y: 630 }, { X: 890, Y: 630 },
    { X: 240, Y: 760 }, { X: 370, Y: 760 }, { X: 500, Y: 760 },
    { X: 630, Y: 760 }, { X: 760, Y: 760 },
    { X: 370, Y: 890 }, { X: 500, Y: 890 }, { X: 630, Y: 890 }
  ]
},
];

function Board() {}

Board.prototype.setup = function (shape) {
  this.shape = shape;
  this.peg = {};
  for(var i=0; i<Common.PEG[shape].ID.length; ++i) {
    this.peg[Common.PEG[shape].ID[i]] = true;
  }
  this.selected = null;
}

Board.prototype.getState = function () {
  return {
    shape: this.shape,
    pegs: this.peg,
    selected: this.selected
  };
};

Board.prototype.select = function ( pegId ) {
  var selectable = false;
  for(var i=0; i<Common.PEG[this.shape].DIRECTION.length && !selectable; ++i) {
    var direction = Common.PEG[this.shape].DIRECTION[i];
    var moveOver = pegId + direction;
    var moveOnto = moveOver + direction;
    selectable = -1 != Common.inArray( moveOnto, Common.PEG[this.shape].ID ) &&
      this.peg[moveOver] && !this.peg[moveOnto];
  }
  this.selected = selectable ? pegId : null;
};

Board.prototype.jump = function ( pegId ) {
  var removeId = (this.selected + pegId) >> 1;
  this.peg[this.selected] = false;
  this.peg[removeId] = false;
  this.peg[pegId] = true;
  this.selected = null;
};

Board.prototype.remove = function ( pegId ) {
  this.peg[pegId] = false;
};

Board.prototype.getPegsLeft = function() {
  var result = 0;
  for(var i in this.peg) {
    result += this.peg[i] ? 1 : 0;
  }
  return result;
};


function Hmi() {
  this.board = new Board();
  this.solutionName = '';
  this.s = Snap('#board').attr({viewBox: '-10 -10 1020 1020' });
  this.s.circle(500, 500, 500).attr({
    fill: '#aaa',
    stroke: '#666',
    strokeWidth: 20,
    fillOpacity: 1
  });
  this.pegShadow = this.s.filter(Snap.filter.shadow(8, 8, .8));
  this.pegGradient = this.s.gradient('l(0,0,1,1)#fff-#d40-#900');
  this.cPegGradient = this.s.gradient('r(0,0,1.4,0.3,0.3)#f60-#620');
  $('#new').click( this.newGame.bind(this) );
  $('#step').click( this.showNext.bind(this) );
}

Hmi.prototype.init = function() {
  var shape = this.getShape();
  this.board.setup(shape);
  var id = Common.PEG[shape].ID;
  this.hmiBoard = {
    'hole' : [],
    'peg' : [],
    'markerRemove' : [],
    'markerJump' : [],
    'button' : []
  };
  var peg = Hmi.PEG[shape];
  for(var n=0; n<peg.LAYOUT.length; ++n) {
    this.hmiBoard.hole[this.hmiBoard.hole.length] = this.s.circle(peg.LAYOUT[n].X, peg.LAYOUT[n].Y, 24).attr({
      fill: '#333',
      stroke: 'black',
      strokeWidth: 3,
      fillOpacity: 1
    });
    this.hmiBoard.peg[this.hmiBoard.peg.length] = this.s.circle(peg.LAYOUT[n].X, peg.LAYOUT[n].Y, 72*peg.SIZE).attr({
      fill: this.cPegGradient, // '#d44400',
      stroke: 'black',
      strokeWidth: 4,
      strokeOpacity: 1,
      fillOpacity: 1,
      filter: this.pegShadow,
      visibility: 'visible'
    });
    this.hmiBoard.markerRemove[this.hmiBoard.markerRemove.length] = this.s.path('m -9.25,-17.75 -8.5,8.5 9.25,9.25 -9.25,9.25 8.5,8.5 L 0,8.5 9.25,17.75 17.75,9.25 8.5,0 17.75,-9.25 9.25,-17.75 0,-8.5 -9.25,-17.75 z').attr({
      fill: '#980101',
      fillOpacity: 1,
      stroke: 'black',
      strokeWidth: '2',
      marker: 'none',
      visibility: 'hidden'
    }).transform( 't' + peg.LAYOUT[n].X + ',' + peg.LAYOUT[n].Y + ' s' + peg.HINTSCALE);
  }
  for(var n=0; n<peg.LAYOUT.length; ++n) {
    var mj = [];
    for (var a=0; a<Common.PEG[shape].DIRECTION.length; a++) {
      mj[mj.length] = this.s.path('m -47,-16 C -87,-40 -182,-98 -270,-44 l 9,14 -72,23 40,-69 L -281,-59 c 63,-40 152,-33 245,27 z').attr({
        fill: '#980101',
        fillOpacity: 1,
        stroke: 'black',
        strokeWidth: 5,
        strokeOpacity: 1,
        marker: 'none',
        visibility: 'hidden'
      }).transform( 't' + peg.LAYOUT[n].X + ',' + peg.LAYOUT[n].Y +
        (shape == 0 ? ' t 0,0' : ( shape == 1 ? ' t 37,9' : ' t 46,11' )) + ' s ' + peg.PEGSCALE + ' r' + (a*(Common.PEG[shape].DIRECTION.length == 4 ? 90 : 60)) +',0,0' );
    }
    this.hmiBoard.markerJump[this.hmiBoard.markerJump.length] = mj;
  }
  for(var n=0; n<peg.LAYOUT.length; ++n) {
    this.hmiBoard.button[this.hmiBoard.button.length] = this.s.circle(peg.LAYOUT[n].X, peg.LAYOUT[n].Y, 72*peg.SIZE).attr({
      stroke: 'black',
      strokeWidth: 1,
      strokeOpacity: 0.01,
      fill: 'orange',
      fillOpacity: 0.01,
      visibility: 'visible'
    }).click(this.myChoice.bind(this));
  }

  $(window).resize(this.resize.bind(this));
  this.resize();
};

Hmi.prototype.resize = function() {
  var shape = this.getShape(),
    setCommon = Common.PEG[shape],
    setHmi = Hmi.PEG[shape];
  var offsetWidth = 64, offsetHeight = 180;
  var innerWidth = window.innerWidth - offsetWidth,
    innerHeight = window.innerHeight - offsetHeight;
  var boardWidth = innerHeight>innerWidth ? innerWidth : innerHeight,
    boardHeight = boardWidth;
  $('#board').attr({ width: ''+boardWidth, height: ''+boardHeight });
};

Hmi.prototype.redraw = function() {
  var boardState = this.board.getState();
  for(var n=0; n<Common.PEG[boardState.shape].ID.length; ++n) {
    this.hmiBoard.markerRemove[n].attr({ visibility: 'hidden' });
  }
  var targetFields = [];
  for(var n=0; n<Common.PEG[boardState.shape].ID.length; ++n) {
    var isNotTargetField = -1 == $.inArray( n, targetFields );
    if (isNotTargetField) {
      var id = Common.PEG[boardState.shape].ID[n];
      var isVisible = boardState.pegs[id];
      
      this.hmiBoard.peg[n].attr({
        strokeWidth: boardState.selected == id ? 10 : 4,
        strokeOpacity: 1,
        fillOpacity: 1,
        visibility : isVisible ? 'visible' : 'hidden'
      });

      for(var i=0; i<Common.PEG[boardState.shape].DIRECTION.length; ++i) {
        var direction = Common.PEG[boardState.shape].DIRECTION[i];
        var moveOver = boardState.selected + direction;
        var moveOnto = moveOver + direction;
        var removeIndex = $.inArray( moveOver, Common.PEG[boardState.shape].ID );
        var targetIndex = $.inArray( moveOnto, Common.PEG[boardState.shape].ID );
        var isJump = -1 != targetIndex &&
          boardState.pegs[moveOver] &&
          !boardState.pegs[moveOnto];
        var v = (boardState.selected == id) && isJump;
        if (v) {
          this.hmiBoard.markerRemove[removeIndex].attr({ visibility: 'visible' });
          this.hmiBoard.peg[targetIndex].attr({
            strokeWidth: 4,
            strokeOpacity: 0.1,
            fillOpacity: 0.1,
            visibility: 'visible',
          });
          targetFields[targetFields.length]=targetIndex;
        }
        this.hmiBoard.markerJump[n][i].attr({
          visibility: v ? 'visible' : 'hidden'
        });
      }
    }
  }
  this.resize();
};

Hmi.prototype.perform = function( n ) {
  var boardState = this.board.getState();
  var id = Common.PEG[boardState.shape].ID[n];
  console.log( 'click : ' + n );
  if (this.board.getPegsLeft() == Common.PEG[boardState.shape].ID.length) {
    this.board.remove( id );
  } else {
    if ( boardState.selected ) {
      for(var i=0; i<Common.PEG[boardState.shape].DIRECTION.length; ++i) {
        var direction = Common.PEG[boardState.shape].DIRECTION[i];
        var moveOver = boardState.selected + direction;
        var moveOnto = moveOver + direction;
        var removeIndex = $.inArray( moveOver, Common.PEG[boardState.shape].ID );
        var targetIndex = $.inArray( moveOnto, Common.PEG[boardState.shape].ID );
        var isJump = -1 != targetIndex &&
          boardState.pegs[moveOver] &&
          !boardState.pegs[moveOnto];
        if (isJump && id == moveOnto) {
          this.board.jump(moveOnto);
        }
      }
    }
    this.board.select( id );
  }
  this.redraw();
};

Hmi.prototype.myChoice = function( event ) {
  $('#step').css({ visibility: 'hidden' });
  var searching = true;
  for( var n=0; n<this.hmiBoard.button.length && searching; n++) {
    if (this.hmiBoard.button[n].id == event.currentTarget.snap) {
      searching = false;
      this.perform(n);
    }
  }
};

Hmi.prototype.newGame = function() {
  console.log('newGame');
  this.solutionName = $('#boardEnglishSolution').is(':checked') ? 'boardEnglishSolution' :
    $('#boardEnglishHeartSolution').is(':checked') ? 'boardEnglishHeartSolution' :
    $('#boardTriangular5CornerSolution').is(':checked') ? 'boardTriangular5CornerSolution' :
    $('#boardTriangular5MidEdgeSolution').is(':checked') ? 'boardTriangular5MidEdgeSolution' :
    $('#boardTriangular5EdgeSolution').is(':checked') ? 'boardTriangular5EdgeSolution' :
    $('#boardTriangular5InnerSolution').is(':checked') ? 'boardTriangular5InnerSolution' :
    $('#boardTriangular6Solution').is(':checked') ? 'boardTriangular6Solution' :
    $('#boardTriangular6FinalLongSweepSolution').is(':checked') ? 'boardTriangular6FinalLongSweepSolution' :
    $('#boardFrench1Solution').is(':checked') ? 'boardFrench1Solution' :
    $('#boardFrench2Solution').is(':checked') ? 'boardFrench2Solution' :
    '';
  var boardState = this.board.getState();
  var peg = Hmi.PEG[boardState.shape];
  for(var n=0; n<peg.LAYOUT.length; ++n) {
    this.hmiBoard.hole[n].remove();
    this.hmiBoard.peg[n].remove();
    this.hmiBoard.markerRemove[n].remove();
    this.hmiBoard.button[n].remove();
    for (var a=0; a<Common.PEG[boardState.shape].DIRECTION.length; a++) {
      this.hmiBoard.markerJump[n][a].remove();
    }
    this.hmiBoard.markerJump[n] = null;
  }
  this.playbackIndex = 0;
  $('#step').css({ visibility: this.solutionName != '' ? 'visible' : 'hidden' });
  this.init();
};

Hmi.prototype.showNext = function() {
  var solution = {
    'boardEnglishSolution': [ 16, 4, 16, 7, 9, 0, 8, 2, 0, 15, 3, 0, 8, 9, 7, 17, 15, 
      5, 17, 6, 8, 15, 3, 13, 15, 22, 8, 20, 22, 3, 15, 12, 10, 17, 5, 19,
      17, 24, 10, 26, 24, 5, 17, 23, 21, 30, 22, 15, 27, 32, 30, 22, 21, 23,
      28, 16, 18, 29, 17, 18, 16 ],
    'boardEnglishHeartSolution': [ 16, 4, 16, 7, 9, 0, 8, 2, 0, 15, 3, 0, 8, 27, 15, 
      20, 22, 6, 20, 23, 21, 20, 22, 25, 23, 32, 24, 30, 32, 17, 29, 32, 24, 5,
      17, 12, 10, 26, 12, 9, 11, 12, 10, 23, 21, 7, 9, 11, 25, 23, 16, 14,
      28, 16, 17, 15, 14, 16 ],
    'boardTriangular5CornerSolution': [ 0, 3, 0, 5, 3, 0, 5, 9, 2, 12, 5, 0, 10,
      12, 6, 1, 0, 3, 13, 11, 3, 12, 11, 13, 14, 12 ],
    'boardTriangular5MidEdgeSolution': [ 3, 0, 3, 6, 1, 5, 3, 1, 6, 14, 5, 2, 9,
      13, 4, 11, 13, 10, 3, 12, 14, 5, 3 ],
    'boardTriangular5EdgeSolution': [ 1, 6, 1, 12, 3, 10, 12, 1, 6, 9, 7, 12,
      3, 6, 1, 8, 14, 12, 2, 9, 12, 5, 9, 2, 0, 5 ],
    'boardTriangular5InnerSolution': [ 4, 13, 4, 11, 13, 6, 8, 9, 7, 2, 9, 1,
      6, 14, 5, 3, 6, 1, 0, 3, 12, 13, 11, 10, 12 ],
    'boardTriangular6Solution': [ 3, 0, 3, 6, 1, 15, 6, 5, 0, 3, 10, 12, 3,
      14, 12, 5, 14, 17, 15, 6, 1, 8, 20, 9, 7, 16, 19, 17, 15 ],
    'boardTriangular6FinalLongSweepSolution': [ 3, 0, 3, 6, 1, 15, 6, 12, 3, 10,
      12, 18, 7, 5, 12, 14, 5, 0, 3, 20, 18, 17, 8, 6, 1, 8, 19, 17, 15 ],
    'boardFrench1Solution': [ 11, 1, 11, 3, 5, 17, 4, 0, 10, 30, 17, 4, 32, 30,
      34, 24, 19, 17, 30, 6, 19, 32, 4, 6, 2, 12, 36, 34, 24, 33,
      31, 28, 26, 15, 17, 30, 32, 19, 6, 14, 12, 7, 5, 8, 10, 22,
      24, 21, 19, 6, 4, 17, 30, 29, 31, 18, 11, 25 ],
    'boardFrench2Solution': [ 0, 2, 0, 11, 1, 9, 11, 24, 10, 34, 24, 19, 17, 30,
      7, 5, 18, 21, 19, 6, 3, 5, 22, 24, 33, 20, 14, 12, 25, 27, 13, 11, 9, 8,
      10, 0, 2, 12, 36, 26, 35, 25, 27, 29, 31, 15, 17, 19, 6, 4, 17, 30,
      32, 28, 26, 36 ]
  };
  if ( this.playbackIndex < solution[this.solutionName].length ) {
    this.perform(solution[this.solutionName][this.playbackIndex++]);
  }
  if ( this.playbackIndex >= solution[this.solutionName].length ) {
    $('#step').css({ visibility: 'hidden' });
  }
};

Hmi.prototype.getShape = function() {
  return $('#boardTriangular5').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular5CornerSolution').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular5MidEdgeSolution').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular5EdgeSolution').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular5InnerSolution').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular6').is(':checked') ? Common.SHAPETRIANGULAR6 :
    $('#boardTriangular6Solution').is(':checked') ? Common.SHAPETRIANGULAR6 :
    $('#boardTriangular6FinalLongSweepSolution').is(':checked') ? Common.SHAPETRIANGULAR6 :
    $('#boardEnglish').is(':checked') ? Common.SHAPEENGLISH :
    $('#boardEnglishSolution').is(':checked') ? Common.SHAPEENGLISH :
    $('#boardEnglishHeartSolution').is(':checked') ? Common.SHAPEENGLISH :
    Common.SHAPEFRENCH;
};

function init() {
  hmi = new Hmi();
  hmi.init();
}

$( init );
