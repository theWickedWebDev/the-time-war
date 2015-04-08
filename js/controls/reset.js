function setBG(bg) {
  bgrnd = new createjs.Bitmap(bg);
  stage.addChild(bgrnd);
  stage.update();
};

function setSonic() {
  stage.removeChild(mouseBp);
  mouseBp = new createjs.Bitmap(mouse);
  stage.addChild(mouseBp);
  moveHandler();
  stage.update();
};

function resetGame(txt) {
  play = false;
  score = 0;
  enemySpeed = 1;
  changeLevel(1);
  resetAllEnemies();
  changeGameText(txt);
  stage.update();
};

function changeGameText(txt) {
  gameTxt = new createjs.Text(txt, '36px Ariel', '#fff');
  gameTxt.textAlign = 'center';
  gameTxt.x = canvas.width / 2;
  gameTxt.y = canvas.height / 2;
  stage.addChild(gameTxt);
}