//
// Copyright (c) 2016 Oliver Merkel
// All rights reserved.
//
// @author Oliver Merkel, <Merkel(dot)Oliver(at)web(dot)de>
//

importScripts('common.js');

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
  var result = {};
  result[Common.SHAPE] = this.shape;
  result[Common.PEGS] = this.peg;
  result[Common.SELECTED] = this.selected;
  return result;
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
