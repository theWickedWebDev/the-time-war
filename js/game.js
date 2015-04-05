//main game loop
function handleTick() {
  if (play == true) {

    rollForCompanion();
    rollForTardis();

    //checking clicks and storing what was clicked
    if (!clicked && stage.mouseX && stage.mouseY) {
      mouseTarget = stage.getObjectUnderPoint(mouseBp.x,mouseBp.y); 
    }

    // if we clicked and it was an object
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
        case 'tardi':
            createjs.Sound.play('sonic');
            useTardis(mouseTarget);
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
        resetEnemy(bmp);
        addToLives(-1);
      }
    }

    //moving companions
    if (companion && companion.x > -20) {
      companion.x -= companion.speed;
    } else {
      removeCompanion(companion);
    }

    //moving tardis
    if (tardis && tardis.x > -20) {
      tardis.x -= tardis.speed;
    } else {
      removeTardis(tardis);
    }
  }
  
  canvas.onclick = handleClick;
  stage.update();
};
