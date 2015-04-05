function handleTick() {
  //checking clicks
  if (!clicked && stage.mouseX && stage.mouseY) {
    mouseTarget = stage.getObjectUnderPoint(mouseBp.x,mouseBp.y); 
  }

  if (clicked && mouseTarget) {
    var tempText = String(mouseTarget.name);
    tempText = tempText.substring(0,5);
    if (tempText!=null && tempText=='dalek') {
      
      // explosions
      setExplosion();

      // play sonic sound
      createjs.Sound.play('sonic');

      // resets
      resetEnemy(mouseTarget);
      score += 50;
      scoreP.innerText = "Score: " + score;
      clicked = false;
    }
  }

  //moving daleks
  if (play == true) {
    var l = bmpList.length;
    for (var i=0;i<l;i++) {
      var bmp = bmpList[i];
      if (bmp.x > -20) {
        bmp.x -= bmp.speed;
      } else {
        createjs.Sound.play('exterminate');
        gameOver();
      }
    }
  }

  stage.update();
  canvas.onclick = handleClick;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
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

function setBG() {
  var bgrnd = new createjs.Bitmap(bg);
  stage.addChild(bgrnd);
  stage.update();
  createDaleks;
};

function setSonic() {
  mouseBp = new createjs.Bitmap(mouse);
  stage.addChild(mouseBp);
  stage.update();
};

function resetEnemy(enemy) {
  enemy.x = canvas.width + Math.random()*300;
  enemy.y = (canvas.height - 100) * Math.random()+50;
  enemy.speed = (Math.random()*5) + dalekSpeed;
};

function handleLoad(event) {
    createjs.Sound.play('theme', {loop:-1});
}

function moveHandler() {
  mouseBp.x = stage.mouseX - 5;
  mouseBp.y = stage.mouseY - 5;
};

function gameOver() {
  gameTxt = new createjs.Text('Click to play!', '36px Ariel', '#fff');
  gameTxt.textAlign = "center";
  gameTxt.x = canvas.width/2;
  gameTxt.y = canvas.height/2;
  stage.addChild(gameTxt);
  play = false;
  score = 0;
  var l = bmpList.length;
  for (var i=0;i<l;i++) {
    var bmp = bmpList[i];
    resetEnemy(bmp);
  }
  stage.update();
};
