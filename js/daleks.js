function createDaleks() {
  var container = new createjs.Container();
  stage.addChild(container);
  var l = numOfDaleks;
  bmpList = [];
  for (i=0;i<l;i++) {
    bitmap = new createjs.Bitmap(dalekImage);
    container.addChild(bitmap);
    bitmap.name = "dalek" + i;
    resetEnemy(bitmap);
    bitmap.regX = bitmap.image.width/2|0;
    bitmap.regY = bitmap.image.height/2|0;
    bitmap.mouseEnabled = true;
    bmpList.push(bitmap)
  }
  
  createjs.Ticker.addEventListener('tick', handleTick);
};

function setExplosion() {
  explosion = new Image();
  explosion.src = 'assets/explosion.png';
  var data = {
    framerate: 10,
    images: [explosion],
    frames: {width:64, height:64, regX:32, regY:32},
    animations: {
        'explode': [0, 25,null,4]
    }
  }

  var spritesheet = new createjs.SpriteSheet(data);
  var animation = new createjs.Sprite(spritesheet, 'explode');
  animation.x = mouseTarget.x;
  animation.y = mouseTarget.y;
  stage.addChild(animation);
  animation.on("animationend", handleExplosionEnd);
  function handleExplosionEnd(event) {
      if (event.name == "explode") { // For example
          event.remove();
          stage.removeChild(animation);
      }
  }
}

function resetEnemy(enemy) {
  addToScore(50);
  enemy.x = canvas.width + (Math.random()*300) + 100;
  enemy.y = (canvas.height - 100) * Math.random()+50;
  enemy.speed = (Math.random()*5) + dalekSpeed;
};