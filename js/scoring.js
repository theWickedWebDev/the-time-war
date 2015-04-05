function addToScore(amt) {
  score += amt;
  if (score > 500 && level == 1) changeLevel(2);
  if (score > 1000 && level == 2) changeLevel(3);
  scoreP.innerText = "Score: " + score;
};

function changeLevel(lvl) {
  level = lvl;
  levelP.innerText = "Level: " + lvl;
  stage.removeChild(bgrnd);

  setBG(queue.getResult('level' + lvl));
  buildSettings();
  createDaleks();
  setSonic();
  stage.update();
};