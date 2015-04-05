function handleTick() {
  if (play == true) {

    rollForCompanion();

    //checking clicks
    if (!clicked && stage.mouseX && stage.mouseY) {
      mouseTarget = stage.getObjectUnderPoint(mouseBp.x,mouseBp.y); 
    }

    if (clicked && mouseTarget) {
      var tempText = String(mouseTarget.name);
      tempText = tempText.substring(0,5);

      switch(tempText) {
        case 'dalek':
            createjs.Sound.play('sonic');
            setExplosion();
            addToScore(50);
            resetEnemy(mouseTarget);
          break;
        case 'roset':
            createjs.Sound.play('sonic');
            addToScore(50*numOfDaleks);
            useCompanion(mouseTarget);
          break;
      }

      clicked = false;
    }

    //moving daleks
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

    //moving companions
    if (companion && companion.x > -20) {
      companion.x -= companion.speed;
    } else {
      removeCompanion(companion);
    }
  }
  
  stage.update();
  canvas.onclick = handleClick;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
};

function setBG(bg) {
  bgrnd = new createjs.Bitmap(bg);
  stage.addChild(bgrnd);
  stage.update();
};

function setSonic() {
  stage.removeChild(mouseBp);
  mouseBp = new createjs.Bitmap(mouse);
  stage.addChild(mouseBp);
  stage.update();
};

function addToScore(amt) {
  score += amt;
  if (score > 500 && level == 1) changeLevel(2);
  if (score > 1000 && level == 2) changeLevel(3);
  scoreP.innerText = "Score: " + score;
};

function handleLoad(event) {
  createjs.Sound.play('theme', {loop:-1});
}

function moveHandler() {
  mouseBp.x = stage.mouseX - 5;
  mouseBp.y = stage.mouseY - 5;
};

function changeLevel(lvl) {
  switch(lvl) {
    case 2:
      level = 2;
      stage.removeChild(bgrnd);
      setBG(queue.getResult('space'));
      break;
    case 3:
      level = 3;
      stage.removeChild(bgrnd);
      setBG(queue.getResult('gallifrey'));
      break;
  }

  stage.update();
  buildSettings();
  setSonic();
  stage.update();
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
