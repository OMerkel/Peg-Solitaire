//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

var hmi, engine;

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
  var svgEmbed = document.embeds['board'];
  if (typeof svgEmbed != 'undefined') {
    if (typeof svgEmbed.getSVGDocument != 'undefined') {
      var svgDocument = svgEmbed.getSVGDocument();
      this.peg = [];
      for(var n=0; n<Common.PEGSTOTAL; ++n) {
        this.peg[n] = svgDocument.getElementById('peg' + Common.PEGID[n]);
        this.peg[n].onclick = this.myChoice.bind(this);
        this.peg[n].ontouchstart = this.myChoice.bind(this);
      }
      this.layerHints = svgDocument.getElementById('layerHints');
      this.jump = new Array(Common.DIRECTION.length);
      for(var i=0; i<this.jump.length; ++i) {
        this.jump[i] = svgDocument.getElementById('hint' + i);
      }
    }
  }
  $(window).resize(this.resize.bind(this));
};

Hmi.prototype.pegsLeft = function() {
  var result = 0;
  for(var i=0; i<this.peg.length; ++i) {
    var pegType = this.peg[i].getAttributeNS(
      'http://www.w3.org/1999/xlink', 'href');
    result += '#peg' == pegType || '#peg_selected' == pegType ? 1 : 0;
  }
  return result;
}

Hmi.prototype.resize = function() {
  console.log("resize");
  var innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;
  var width = innerHeight>innerWidth ? 0.9 * innerWidth : 0.9 * innerHeight,
    height = width;
  $('#board').width(width);
  $('#board').height(height);

  var minSize = 32;
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
  $('#customBackAbout').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
}

Hmi.prototype.redraw = function(board) {
  var selected = board[Common.SELECTED];
  for(var n=0; n<Common.PEGSTOTAL; ++n) {
    var peg = this.peg[n],
      pegId = Number(peg.id.slice(-2));
    var isVisible = board[Common.PEGS][pegId];
    peg.setAttributeNS('http://www.w3.org/1999/xlink',
      'href', isVisible ? ( pegId == board[Common.SELECTED] ?
      '#peg_selected' : '#peg' ) : '#empty' );
    if (pegId == selected) {
      var transform = peg.getAttributeNS('', 'transform');
      this.layerHints.setAttributeNS('', 'transform', transform);
    }
  }

  for(var i=0; i<Common.DIRECTION.length; ++i) {
    if (null == selected) {
      this.jump[i].setAttributeNS(
        'http://www.w3.org/1999/xlink', 'href',
        '#hidden' );
    } else {    
      var direction = Common.DIRECTION[i];
      var moveOver = selected + direction;
      var moveOnto = moveOver + direction;
      var targetIndex = $.inArray( moveOnto, Common.PEGID );
      var isJump = -1 != targetIndex &&
        board[Common.PEGS][moveOver] &&
        !board[Common.PEGS][moveOnto];
      this.jump[i].setAttributeNS(
        'http://www.w3.org/1999/xlink', 'href',
        isJump ? '#jump' + i : '#hidden' );
      if (isJump) {
        this.peg[targetIndex].setAttributeNS(
          'http://www.w3.org/1999/xlink', 'href',
          '#peg_target'
        );
      }
    }
  }

};

Hmi.prototype.myChoice = function( e ) {
  if (typeof e.currentTarget == 'object') {
    if (e.currentTarget.id.startsWith('peg')) {
      // this.disablePegSelection();
      var idPeg = Number(e.currentTarget.id.slice(-2));
      console.log('idPeg ' + idPeg);
      console.log('pegs left ' + this.pegsLeft());
      if ( Common.PEGSTOTAL == this.pegsLeft() ) {
        engine.postMessage({ class: 'request',
          request: 'remove', peg: idPeg });
      }
      else {
        var pegType = e.currentTarget.getAttributeNS(
          'http://www.w3.org/1999/xlink', 'href');
        if ('#peg_target' == pegType) {
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
  engine.postMessage({ 'class': 'request', 'request': 'restart' });
};

function newGame() {
  hmi.restart();
}

function sync(event, ui) {
  if( 'game-page' == ui.toPage[0].id ) {
    hmi.init();
    engine.postMessage({ class: 'request',
      request: 'sync' });
  }
}

function init() {
  hmi = new Hmi();
  hmi.init();
  engine = new Worker('js/engine.js');
  engine.addEventListener('message', function( ev ) {
    engineEventListener( ev );
  }, false);
  engine.postMessage({ class: 'request', request: 'start' });
  $(window).resize();
  $('#new').click( newGame );
  $( document ).on( 'pagecontainershow', sync);
}

function svgWait() {
  var svgEmbed = document.embeds['board'];
  if (typeof svgEmbed != 'undefined') {
    if (typeof svgEmbed.getSVGDocument != 'undefined') {
      var svgDocument = svgEmbed.getSVGDocument();
      if (null != svgDocument) {
        init();
      }
      else {
        setTimeout( svgWait,5 );
      }
    }
  }
}

$( svgWait );
