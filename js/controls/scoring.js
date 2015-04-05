function addToScore(amt) {
  score += amt;
  if (score >= 2000 && level == 1) changeLevel(2);
  if (score >= 7000 && level == 2) changeLevel(3);
  if (score >= 10000 && level == 3) changeLevel(4);
  if (score >= 15000 && level == 4) changeLevel(5);
  if (score >= 20000 && level == 5) changeLevel(6);
  if (score >= 50000) resetGame('You Defeated the Daleks!');

  scoreP.innerText = "Score: " + score;
};

function addToLives(amt) {
  lives += amt;
  livesP.innerText = "X " + lives;
  if (lives < 0) { 
    livesP.innerText = 'X 0';
    resetGame('Game Over!');
  }
};

function changeLevel(lvl) {
  level = lvl;
  levelP.innerText = "Level: " + lvl;
  stage.removeChild(bgrnd);

  setBG(queue.getResult('level' + lvl));
  enemySpeed += 2;

  removeAllEnemies();
  createEnemies(allEnemies.dalek, 5);
  createEnemies(allEnemies.angel, 2);
  createEnemies(allEnemies.cyber, 3);
  
  
  setSonic();
  stage.update();
};