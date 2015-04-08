'use strict';

var play;
// main game loop
function handleTick() {
  if (play == true) {

    // checking clicks and storing what was clicked
    if (!clicked && stage.mouseX && stage.mouseY) {
      mouseTarget = stage.getObjectUnderPoint(mouseBp.x, mouseBp.y);
    }

    // if we clicked and it was an object
    if (clicked && mouseTarget) {
      var tempText = String(mouseTarget.name);
      tempText = tempText.substring(0, 5);
      switch (tempText) {
        case 'dalek':
          createjs.Sound.play('sonic');
          setExplosion();
          resetEnemy(mouseTarget);
          addToScore(50);
          break;
        case 'angel':
          createjs.Sound.play('sonic');
          setExplosion();
          resetEnemy(mouseTarget);
          addToScore(50);
          break;
        case 'cyber':
          createjs.Sound.play('sonic');
          setExplosion();
          resetEnemy(mouseTarget);
          addToScore(50);
          break;
        case 'tardi':
          createjs.Sound.play('sonic');
          useCompanion(mouseTarget);
          mouseTarget.out = false;
          stage.update();
          addToLives(1);
          break;
        case 'roset':
          createjs.Sound.play('sonic');
          useCompanion(mouseTarget);
          mouseTarget.out = false;
          resetAllEnemies();
          stage.update();
          addToScore(100);
          break;
      }

      clicked = false;
    }

    // moving enemies
    var l = enemyList.length;
    for (var i = 0; i < l; i++) {
      // get enemy
      var bmp = enemyList[i];
      // move further to the left
      if (bmp.x > -20) {
        bmp.x -= bmp.speed;
      } else {
        // moved off the screen
        switch (bmp.name.substring(0, 5)) {
          case 'cyber':
            createjs.Sound.play('delete');
            break;
          default:
            createjs.Sound.play('exterminate');
        }
        resetEnemy(bmp);
        addToLives(-1);
      }
    }

    // moving companions
    var l = companionList.length;
    for (var i = 0; i < l; i++) {
      // get companion
      var bmp = companionList[i];
      // move further to the left
      if (bmp.x > -20) {
        bmp.x -= bmp.speed;
      } else {
        // moved of the screen
        switch (bmp.name.substring(0, 5)) {
          case 'tardi':
            break;
        }
        resetCompanion(bmp);
      }
    }
  }

  canvas.onclick = handleClick;
  stage.update();
};

