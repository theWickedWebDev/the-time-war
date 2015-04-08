'use strict';

function createRose() {
  companionImage = queue.getResult('rose');
  companionOut = true;
  companion = new createjs.Bitmap(companionImage);
  stage.addChild(companion);
  companion.name = 'roset';
  resetCompanion(companion);
  var originalW = companion.image.width,
  originalH = companion.image.height,
  desiredW = 36,
  desiredH = 90;

  companion.scaleX = companion.scaleY = desiredW / originalW;
  companion.regX = 0;
  companion.regY = 0;
  companion.mouseEnabled = true;
};