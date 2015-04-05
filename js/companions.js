function createCompanion() {
  companionImage = queue.getResult('rose');
  companionOut = true;
  companion = new createjs.Bitmap(companionImage);
  stage.addChild(companion);
  companion.name = 'roset';
  resetCompanion(companion);
  var originalW = companion.image.width;
  var originalH = companion.image.height;

  var desiredW = 36;
  var desiredH = 90;

  companion.scaleX = companion.scaleY = desiredW / originalW;
  companion.regX = 0;
  companion.regY = 0;
  companion.mouseEnabled = true;
  stage.update();
  setSonic()
};

function useCompanion(companion) {
  stage.removeChild(companion);
  removeAllDaleks();
  companionOut = false;
};

function removeCompanion(companion) {
  stage.removeChild(companion);
  companion = null;
  companionOut = false;
};

function rollForCompanion() {
  if(!companionOut) {
    var companionRoll = (Math.random()*1000);
    if(companionRoll > companionRarity) createCompanion();
  }
};

function resetCompanion(enemy) {
  enemy.x = canvas.width + Math.random()*300;
  enemy.y = (canvas.height - 100) * Math.random()+50;
  enemy.speed = (Math.random()*1) + companionSpeed;
};