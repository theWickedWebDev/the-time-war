//main game loop
function handleTick() {
  if (play == true) {

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
        case 'angel':
            createjs.Sound.play('sonic');
            setExplosion();
            addToScore(50);
            resetEnemy(mouseTarget);
          break;
        case 'cyber':
            createjs.Sound.play('sonic');
            setExplosion();
            addToScore(50);
            resetEnemy(mouseTarget);
          break;
      }

      clicked = false;
    }

    //moving enemies
    var l = enemyList.length;
    for (var i=0;i<l;i++) {
      var bmp = enemyList[i];
      if (bmp.x > -20) {
        bmp.x -= bmp.speed;
      } else {
        createjs.Sound.play('exterminate');
        resetEnemy(bmp);
        addToLives(-1);
      }
    }
  }
  
  canvas.onclick = handleClick;
  stage.update();
};
