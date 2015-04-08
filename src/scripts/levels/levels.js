'use strict';

function changeLevel(lvl) {
  level = lvl;
  levelP.innerText = 'Level: ' + lvl;
  stage.removeChild(bgrnd);

  setBG(queue.getResult('level' + lvl));
  enemySpeed += 2;

  removeAllEnemies();

  switch (lvl) {
    case 1:
      createEnemies(allEnemies.dalek, 5);
      createCompanions(allCompanions.roset, 1);
      break;
    case 2:
      createCompanions(allCompanions.tardi, 1);
      createEnemies(allEnemies.dalek, 5);
      createEnemies(allEnemies.angel, 2);
      createCompanions(allCompanions.roset, 1);
      break;
    case 3:
      createEnemies(allEnemies.dalek, 5);
      createEnemies(allEnemies.angel, 2);
      createEnemies(allEnemies.cyber, 1);
      createCompanions(allCompanions.roset, 1);
      break;
    case 4:
      createEnemies(allEnemies.dalek, 5);
      createEnemies(allEnemies.angel, 2);
      createEnemies(allEnemies.cyber, 3);
      createCompanions(allCompanions.roset, 1);
      break;
    case 5:
      createEnemies(allEnemies.dalek, 5);
      createEnemies(allEnemies.angel, 2);
      createEnemies(allEnemies.cyber, 4);
      createCompanions(allCompanions.roset, 1);
      break;
    case 6:
      createCompanions(allCompanions.tardi, 1);
      createEnemies(allEnemies.dalek, 5);
      createEnemies(allEnemies.angel, 5);
      createEnemies(allEnemies.cyber, 5);
      createCompanions(allCompanions.roset, 1);
      break;
  }

  setSonic();
  stage.update();
};