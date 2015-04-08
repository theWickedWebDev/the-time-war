'use strict';

var enemySpeed = 1;
var enemyList = [];

var daleks = [
  {id: 'explosion', src:'assets/explosion.png'},
  {id: 'dalek1', src:'assets/dalek.png'},
  {id: 'dalek2', src:'assets/dalek2.png'},
  {id: 'dalek3', src:'assets/dalek3.png'},
  {id: 'dalek4', src:'assets/dalek4.png'},
  {id: 'dalek5', src:'assets/dalek5.png'},
  {id: 'angel1', src:'assets/weepingangel.png'},
  {id: 'angel2', src:'assets/weepingangel2.png'},
  {id: 'cyber1', src:'assets/cybermen.png'}
];

queue.loadManifest(daleks);

var allEnemies = {
  dalek: {
    name: 'dalek',
    count: 5
  },
  angel: {
    name: 'angel',
    count: 2
  },
  cyber: {
    name: 'cyber',
    count: 1
  }
};

function createEnemies(newEnemy, amt) {
  // creates the enemy container
  var enemyContainer = new createjs.Container();
  stage.addChild(enemyContainer);

  amt = amt || 1;

  for (i = 0; i < amt; i++) {
    var enemyToMake = newEnemy.name;
    var enemyType = Math.floor(Math.random() * newEnemy.count) + 1;

    var enemyImage = queue.getResult(enemyToMake + enemyType);
    var enemy = new createjs.Bitmap(enemyImage);
    enemyContainer.addChild(enemy);

    enemy.name = enemyToMake + i;
    enemy.out = true;

    // puts it to right of sreen
    resetEnemy(enemy);

    // resizes it randomly
    randomEnemySize(enemy, 8);

    // sets coords for explosions
    enemy.regX = enemy.image.width / 2 | 0;
    enemy.regY = enemy.image.height / 2 | 0;
    enemy.mouseEnabled = true;

    // adds to enemy list
    enemyList.push(enemy)
  }
};

// sets explosion at mouseTarget coordinates
function setExplosion() {
  // explosion image
  var explosion = queue.getResult('explosion');

  // animation data
  var data = {
    framerate: 10,
    images: [explosion],
    frames: {width: 64, height: 64, regX: 32, regY: 32},
    animations: {
      explode: [0, 25, null, 4]
    }
  }

  // animation sprite info and coords
  var spritesheet = new createjs.SpriteSheet(data);
  var animation = new createjs.Sprite(spritesheet, 'explode');
  animation.x = mouseTarget.x;
  animation.y = mouseTarget.y;

  // starts animation
  stage.addChild(animation);

  // after animation is over
  animation.on('animationend', handleExplosionEnd);

  function handleExplosionEnd(event) {
    if (event.name == 'explode') { // For example
      event.remove();
      stage.removeChild(animation);
    }
  }
}

// moves selected enemy back to position
function resetEnemy(enemy) {
  enemy.x = canvas.width + (Math.random() * 300) + 100;
  enemy.y = (canvas.height - 100) * Math.random() + 50;
  randomEnemySize(enemy, 8);
  enemy.speed = (Math.random() * 5) + enemySpeed;
};

// ranomizes the size of the enemy
function randomEnemySize(enemy, amt) {
  var enemySize = (Math.floor(Math.random() * amt)) / 10;
  enemy.scaleX = 1 + enemySize;
  enemy.scaleY = 1 + enemySize;
}

// resets all enemies
function resetAllEnemies() {
  var l = enemyList.length;
  for (var i = 0; i < l; i++) {
    var bmp = enemyList[i];
    resetEnemy(bmp);
  }
}

function removeAllEnemies() {
  enemyList = [];
  var l = enemyList.length;
  for (var i = 0; i < l; i++) {
    var bmp = enemyList[i];
    stage.removeChild(bmp);
  }
}