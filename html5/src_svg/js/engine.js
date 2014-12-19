//
// Copyright (c) 2014 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

importScripts('board.js');

var session;

function init() {
  session = new Session();
}

init();

function hmiEventListener( eventReceived ) {
  var data = eventReceived.data;
  switch (data.class) {
    case 'response':
      processHmiResponse( eventReceived );
      break;
    case 'request':
      processHmiRequest( eventReceived );
      break;
    default:
      console.log('Hmi used unknown event class');
  }
}

function processHmiResponse( eventReceived ) {
  var data = eventReceived.data;
  switch (data.state) {
    default:
      console.log('Hmi reported unknown state');
  }
}

function processHmiRequest( eventReceived ) {
  var data = eventReceived.data;
  switch (data.request) {
    case 'remove':
      session.remove(data);
      break;
    case 'select':
      session.select(data);
      break;
    case 'jump':
      session.jump(data);
      break;
    case 'start':
    case 'restart':
      session.setup();
      break;
    case 'sync':
      break;
    default:
      console.log('Hmi used unknown request');
  }
  session.draw();
}

self.addEventListener('message', function( ev ) {
  hmiEventListener( ev );
}, false);

function Session() {
  this.board = new Board();
}

Session.prototype.draw = function () {
  self.postMessage({ eventClass: 'request',
    request: 'redraw',
    board: this.board.getState(),
  });
};

/*
 * get available moves list
 *
 * This is a move generator returning a list of legal moves
 * of the current game situation.
 * 
 */
Session.prototype.getMoves = function () {
  var result = [];
  return result;
};

Session.prototype.remove = function ( data ) {
  this.board.remove(Number(data.peg));
};

Session.prototype.jump = function ( data ) {
  this.board.jump(Number(data.peg));
};

Session.prototype.select = function ( data ) {
  this.board.select(Number(data.peg));
};

Session.prototype.move = function ( data ) {
  var validMove = false;
  var moves = this.getMoves();
  for(var index=0; index<moves.length; ++index) {
    validMove |= data.move == moves[index];
  }
  if (validMove) {
    // do some magic
  }
  else {
    this.draw();
  }
};

Session.prototype.setup = function () {
  this.board.setup();
};
