function createTardis() {
  tardisImage = queue.getResult('tardis');
  tardisOut = true;
  tardis = new createjs.Bitmap(tardisImage);
  stage.addChild(tardis);
  tardis.name = 'tardis';
  resetTardis(tardis);
  tardis.scaleX = 1.3;
  tardis.scaleY = 1.3;
  tardis.mouseEnabled = true;
  stage.update();
  setSonic();
};

function useTardis(tardis) {
  tardisOut = false;
  stage.removeChild(tardis);
  addToLives(1);
};

function removeTardis(tardis) {
  stage.removeChild(tardis);
  tardis = null;
  tardisOut = false;
};

function rollForTardis() {
  if(!tardisOut) {
    var tardisRoll = (Math.random()*10000);
    if(tardisRoll > tardisRarity) {
      var coinFlip = Math.floor(Math.random() * 2)+1;
      console.log(coinFlip);
      if (coinFlip == 2) createTardis();
    }
  }
};

function resetTardis(enemy) {
  enemy.x = canvas.width + Math.random()*300;
  enemy.y = (canvas.height - 100) * Math.random()+50;
  enemy.speed = (Math.random()*1) + 5;
};