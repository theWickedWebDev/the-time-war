'use strict';

var companionSpeed = 1;
var companionList = [];

var companionImageList = [
  {id: 'tardi1', src:'assets/tardis.png'},
  {id: 'roset1', src:'assets/rose.png'}
];

queue.loadManifest(companionImageList);

var allCompanions = {
  tardi: {
    name: 'tardi',
    count: 1
  },
  roset: {
    name: 'roset',
    count: 1
  }
};

function createCompanions(newCompanion, amt) {
  // creates the companion container
  var companionContainer = new createjs.Container();
  stage.addChild(companionContainer);

  amt = amt || 1;

  for (var i = 0; i < amt; i++) {
    var companionToMake = newCompanion.name;
    var companionType = Math.floor(Math.random() * newCompanion.count) + 1;

    var companionImage = queue.getResult(companionToMake + companionType);
    var companion = new createjs.Bitmap(companionImage);
    companionContainer.addChild(companion);

    companion.name = companionToMake + i;
    companion.out = true;

    // puts it to right of sreen
    resetCompanion(companion);

    // sets coords for explosions
    companion.regX = companion.image.width / 2 | 0;
    companion.regY = companion.image.height / 2 | 0;
    companion.mouseEnabled = true;

    // adds to companion list
    companionList.push(companion)
  }
}

// moves selected companion back to position
function resetCompanion(companion) {
  companion.x = canvas.width + (Math.random() * 300) + 100;
  companion.y = (canvas.height - 100) * Math.random() + 50;
  randomCompanionSize(companion, 8);
  companion.speed = (Math.random() * 5) + companionSpeed;
};

// resets then freezes
function useCompanion(companion) {
  if (companion.out) {
    companion.x = canvas.width + (Math.random() * 300) + 100;
    companion.y = (canvas.height - 100) * Math.random() + 50;
    randomCompanionSize(companion, 8);
    companion.speed = 0;
  }
}

// randomizes the size of the companion
function randomCompanionSize(companion, amt) {
  var companionSize = (Math.floor(Math.random() * amt)) / 10;
  companion.scaleX = 1 + companionSize;
  companion.scaleY = 1 + companionSize;
}

// resets all companions
function resetAllCompanions() {
  var l = companionList.length;
  for (var i = 0; i < l; i++) {
    var bmp = companionList[i];
    resetCompanion(bmp);
  }
}

// removes all companions from stage
function removeAllCompanions() {
  companionList = [];
  var l = companionList.length;
  for (var i = 0; i < l; i++) {
    var bmp = companionList[i];
    stage.removeChild(bmp);
  }
}