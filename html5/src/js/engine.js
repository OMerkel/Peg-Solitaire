//
// Copyright (c) 2016 Oliver Merkel
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
      session.setup(data.shape);
      break;
    case 'sync':
      if ( data.shape != session.board.shape ) {
        session.setup(data.shape);
      }
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

Session.prototype.remove = function ( data ) {
  this.board.remove(Number(data.peg));
};

Session.prototype.jump = function ( data ) {
  this.board.jump(Number(data.peg));
};

Session.prototype.select = function ( data ) {
  this.board.select(Number(data.peg));
};

Session.prototype.setup = function (shape) {
  this.board.setup(Number(shape));
};
