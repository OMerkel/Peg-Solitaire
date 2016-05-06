//
// Copyright (c) 2016 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

var hmi, engine;

Hmi.PEG = [
{
  SIZE: 140,
  HINTWIDTH: 848.2,
  HINTHEIGHT: 848.2,
  LAYOUT: [
    { X: 500, Y: 100 },
    { X: 413, Y: 250 }, { X: 586, Y: 250 },
    { X: 327, Y: 400 }, { X: 500, Y: 400 }, { X: 673, Y: 400 },
    { X: 240, Y: 550 }, { X: 413, Y: 550 },
    { X: 586, Y: 550 }, { X: 759, Y: 550 },
    { X: 154, Y: 700 }, { X: 327, Y: 700 },
    { X: 500, Y: 700 }, { X: 673, Y: 700 }, { X: 846, Y: 700 }
  ],
  DIRECTION: [ 'hex-upperleft', 'hex-upperright', 'right',
    'hex-lowerright', 'hex-lowerleft', 'left' ]
},
{
  SIZE: 120,
  HINTWIDTH: 673.2,
  HINTHEIGHT: 673.2,
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
  ],
  DIRECTION: [ 'hex-upperleft', 'hex-upperright', 'right',
    'hex-lowerright', 'hex-lowerleft', 'left' ]
},
{
  SIZE: 105,
  HINTWIDTH: 630.2,
  HINTHEIGHT: 630.2,
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
  ],
  DIRECTION: [ 'orth-up', 'right', 'orth-down', 'left' ]
},
{
  SIZE: 105,
  HINTWIDTH: 630.2,
  HINTHEIGHT: 630.2,
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
  ],
  DIRECTION: [ 'orth-up', 'right', 'orth-down', 'left' ]
},
];

function engineEventListener( eventReceived ) {
  var data = eventReceived.data;
  switch (data.eventClass) {
    case 'response':
      processEngineResponse( eventReceived );
      break;
    case 'request':
      processEngineRequest( eventReceived );
      break;
    default:
      console.log('Engine used unknown event class');
  }
}

function processEngineResponse( eventReceived ) {
  var data = eventReceived.data;
  switch (data.state) {
    case 'running':
      console.log('Engine reported: ' + data.state);
      break;
    case 'ack_move':
      console.log('Engine reported ack move from bowl ' + data.bowl);
      break;
    case 'message':
      console.log('Engine reported message: ' + data.message);
      break;
    default:
      console.log('Engine reported unknown state');
  }
}

function processEngineRequest( eventReceived ) {
  var data = eventReceived.data;
  switch (data.request) {
    case 'redraw':
      console.log('Engine request: ' + data.request);
      hmi.redraw(data.board);
      break;
    default:
      console.log('Engine used unknown request');
  }
}

function Hmi() {
}

Hmi.prototype.init = function() {
  var shape = getShape();
  var id = Common.PEG[shape].ID;
  this.hole = [];
  this.peg = [];
  $('#pegboard').html('')
  for(var n=0; n<id.length; ++n) {
    this.hole[n] = $('<div id="hole' + id[n] + '" class="hole"></div>');
    this.hole[n].appendTo('#pegboard');
    this.peg[n] = $('<div id="peg' + id[n] + '" class="peg"></div>');
    this.peg[n].appendTo('#pegboard');
    this.peg[n].on('click', this.myChoice.bind(this));
    this.peg[n].on('touchstart', this.myChoice.bind(this));
  }

  $(window).resize(this.resize.bind(this));
  this.jump = [];
  var jump = null;
  for(var j=0; j<6; ++j) {
    jump = $('<object id="jump_' +
      Hmi.PEG[Common.SHAPETRIANGULAR5].DIRECTION[j] + '" data="img/jump' + j +
      '.svg" type="image/svg+xml" class="hint"></object>');
    jump.appendTo('#pegboard');
    this.jump[this.jump.length] = jump;
  }
  jump = $('<object id="jump_' + Hmi.PEG[Common.SHAPEENGLISH].DIRECTION[0] +
    '" data="img/jump' + 6 + '.svg" type="image/svg+xml" class="hint"></object>');
  jump.appendTo('#pegboard');
  this.jump[this.jump.length] = jump;
  jump = $('<object id="jump_' + Hmi.PEG[Common.SHAPEENGLISH].DIRECTION[2] +
    '" data="img/jump' + 7 + '.svg" type="image/svg+xml" class="hint"></object>');
  jump.appendTo('#pegboard');
  this.jump[this.jump.length] = jump;
};

Hmi.prototype.pegsLeft = function() {
  var result = 0;
  for(var i=0; i<this.peg.length; ++i) {
    result += this.peg[i].hasClass('hidden') ? 0 :
      this.peg[i].hasClass('peg_target') ? 0 : 1;
  }
  return result;
}

Hmi.prototype.resize = function() {
  console.log("resize");
  var shape = getShape(),
    setCommon = Common.PEG[shape],
    setHmi = Hmi.PEG[shape];
  var innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;
  var boardWidth = innerHeight>innerWidth ? 0.85 * innerWidth : 0.85 * innerHeight,
    boardHeight = boardWidth;

  var board = $('#pegboard');
  var boardBorder = 10,
    boardTop = ((innerHeight - boardHeight) >> 1) - boardBorder,
    boardLeft = ((innerWidth - boardWidth) >> 1) - boardBorder;

  board.css({
    'top': boardTop +'px',
    'left': boardLeft +'px',
    'width': boardWidth +'px',
    'height': boardHeight +'px',
    'border': boardBorder +'px',
    'border-style': 'solid',
    'border-color': '#666',
    'border-radius': (boardBorder + 0.5 * boardWidth) +'px',
    'margin': '0px',
    'padding': '0px',
  });

  for(var i = 0; i<setCommon.ID.length; ++i) {
    var hole = $('#hole' + setCommon.ID[i]),
      peg = $('#peg' + setCommon.ID[i]),
      isHidden = peg.hasClass('hidden'),
      isSelected = peg.hasClass('peg_selected'),
      pegWidth = boardWidth * setHmi.SIZE / 1000,
      pegHeight = boardHeight * setHmi.SIZE / 1000,
      holeWidth = 0.3 * pegWidth,
      holeHeight = 0.3 * pegHeight,
      pegBorder = isSelected ? 6 : 3,
      pegTopCenter = boardHeight * setHmi.LAYOUT[i].Y / 1000,
      pegTop = pegTopCenter - ( pegHeight * 0.5 ) - pegBorder,
      holeTop = pegTopCenter - ( holeHeight * 0.5 ) - pegBorder,
      pegLeftCenter = boardWidth * setHmi.LAYOUT[i].X / 1000,
      pegLeft = pegLeftCenter - ( pegWidth * 0.5 ) - pegBorder,
      holeLeft = pegLeftCenter - ( holeWidth * 0.5 ) - pegBorder;
    if (isSelected) {
      this.setHintsLocation( pegLeftCenter, pegTopCenter, boardWidth, boardHeight, setHmi );
    }
    hole.css({
      'top': holeTop +'px',
      'left': holeLeft +'px',
      'width': holeWidth +'px',
      'height': holeHeight +'px',
      'border-radius': (pegBorder + 0.5 * holeWidth) +'px',
      'margin': '0px',
      'padding': '0px',
    });
    peg.css({
      'top': pegTop +'px',
      'left': pegLeft +'px',
      'width': pegWidth +'px',
      'height': pegHeight +'px',
      'border-radius': (pegBorder + 0.5 * pegWidth) +'px',
      'margin': '0px',
      'padding': '0px',
    });
  }

  var minSize = 64;
  var size = 0.06 * innerWidth < minSize ? minSize : 0.06 * innerWidth;
  $('#customMenu').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  size = 0.05 * innerWidth < minSize ? minSize : 0.05 * innerWidth;
  $('#customBackRules').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackOptions').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackAbout').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
}

Hmi.prototype.setHintsLocation = function( left, top, boardWidth, boardHeight, set ) {
  for(var j=0; j<this.jump.length; ++j) {
    var hintWidth = boardWidth * set.HINTWIDTH / 1000,
      hintHeight = boardWidth * set.HINTHEIGHT / 1000 * 6;
    this.jump[j].css({
      'left': (left - hintWidth * 0.5) +'px',
      'top': (top - hintHeight * 0.5) +'px',
      'width': hintWidth,
      'height': hintHeight,
    });
  }
};

Hmi.prototype.redraw = function(board) {
  var selected = board[Common.SELECTED],
    shape = board[Common.SHAPE];
  for(var n=0; n<Common.PEG[shape].ID.length; ++n) {
    var pegId = Common.PEG[shape].ID[n];
    var isVisible = board[Common.PEGS][pegId];
    var id = '#peg' + pegId;
    $(id).attr('class', isVisible ? ( pegId == selected ?
      'peg_selected' : 'peg' ) : 'hidden' );
  }

  for(var i=0; i<this.jump.length; ++i) {
    var jump = this.jump[i],
      jumpDirection = jump.attr('id').slice(5),
      indexDirection = $.inArray( jumpDirection, Hmi.PEG[shape].DIRECTION ),
      isSupportedDirection = -1 != indexDirection;
    if ( null == selected || !isSupportedDirection ) {
      jump.css( 'visibility', 'hidden' );
    } else {
      var direction = Common.PEG[shape].DIRECTION[indexDirection];
      var moveOver = selected + direction;
      var moveOnto = moveOver + direction;
      var targetIndex = $.inArray( moveOnto, Common.PEG[shape].ID );
      var isJump = -1 != targetIndex &&
        board[Common.PEGS][moveOver] &&
        !board[Common.PEGS][moveOnto];
      jump.css( 'visibility', isJump ? 'visible' : 'hidden' );
      if (isJump) {
        this.peg[targetIndex].attr( 'class', 'peg_target' );
      }
    }
  }

  this.resize();
};

if ( !String.prototype.startsWith ) {
  String.prototype.startsWith = function(myString) {
    return this.slice(0, myString.length) === myString;
  }
}

Hmi.prototype.myChoice = function( e ) {
  if (typeof e.currentTarget == 'object') {
    if (e.currentTarget.id.startsWith('peg') &&
      !($('#' + e.currentTarget.id).hasClass('hidden'))) {
      // this.disablePegSelection();
      var idPeg = Number(e.currentTarget.id.slice(-2));
      console.log('idPeg ' + idPeg);
      console.log('pegs left ' + this.pegsLeft());
      if ( Common.PEG[getShape()].ID.length == this.pegsLeft() ) {
        engine.postMessage({ class: 'request',
          request: 'remove', peg: idPeg });
      }
      else {
        if ( $('#' + e.currentTarget.id).hasClass('peg_target') ) {
          engine.postMessage({ class: 'request',
            request: 'jump', peg: idPeg });
        } else {
          engine.postMessage({ class: 'request',
            request: 'select', peg: idPeg });
        }
      }
    }
  }
};

Hmi.prototype.restart = function() {
  console.log('restart');
  engine.postMessage({ 'class': 'request',
    'request': 'restart', shape: getShape() });
};

function newGame() {
  hmi.restart();
  $( '#left-panel' ).panel( 'close' );
}

function getShape() {
  return $('#boardTriangular5').is(':checked') ? Common.SHAPETRIANGULAR5 :
    $('#boardTriangular6').is(':checked') ? Common.SHAPETRIANGULAR6 :
    $('#boardEnglish').is(':checked') ? Common.SHAPEENGLISH :
    Common.SHAPEFRENCH;
}

function sync(event, ui) {
  if( 'game-page' == ui.toPage[0].id ) {
    hmi.init();
    engine.postMessage({ class: 'request',
      request: 'sync', shape: getShape() });
  }
}

function init() {
  hmi = new Hmi();
  hmi.init();
  engine = new Worker('js/engine.js');
  engine.addEventListener('message', function( ev ) {
    engineEventListener( ev );
  }, false);
  engine.postMessage({ class: 'request',
    request: 'start', shape: getShape() });
  //$(window).resize();
  $('#new').click( newGame );
  $( document ).on( 'pagecontainershow', sync);
}

$( init );
