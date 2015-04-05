function addToScore(amt) {
  score += amt;
  if (score >= 1000 && level == 1) changeLevel(2);
  if (score >= 2000 && level == 2) changeLevel(3);
  if (score >= 3000 && level == 3) changeLevel(4);
  if (score >= 4000 && level == 4) changeLevel(5);
  if (score >= 5000 && level == 5) changeLevel(6);
  if (score >= 10000) resetGame('You Defeated the Daleks!');

  scoreP.innerText = "Score: " + score;
};

function changeLevel(lvl) {
  level = lvl;
  levelP.innerText = "Level: " + lvl;
  stage.removeChild(bgrnd);

  setBG(queue.getResult('level' + lvl));
  buildSettings();
  dalekSpeed += 2;
  createDaleks();
  setSonic();
  stage.update();
};