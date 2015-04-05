// defaults
var level = 1;
var lives = 3;
var score = 0;

var canvas, stage
var bg, bgrnd;
var play;
var gameTxt;

var mouseTarget, clicked, mouseBp, mouse;

var queue = new createjs.LoadQueue();
var audioPath = 'assets/';
var scoreP, livesP;


// preloads sounds
  var sounds = [
    {id:'sonic', src:'sonic.mp3'},
    {id:'exterminate', src:'exterminate.mp3'},
    {id:'theme', src:'theme.mp3'}
  ];
  createjs.Sound.registerSounds(sounds, audioPath); 
  createjs.Sound.alternateExtensions = ["mp3"]; 
  createjs.Sound.addEventListener("fileload", handleLoad);
// ends preload


// preloads images
  var levels = [
    {id: 'level1', src:'assets/gallifrey2.jpg'},
    {id: 'level2', src:'assets/space.jpg'},
    {id: 'level3', src:'assets/gallifrey.jpg'},
    {id: 'level4', src:'assets/space2.jpg'},
    {id: 'level5', src:'assets/badwolf.jpg'},
    {id: 'level6', src:'assets/tardisexplode.jpg'}
  ]
  var images = [
    {id:'sonic', src:'assets/sonic.png'}
  ]
  queue.loadManifest(levels); 
  queue.loadManifest(images); 
// ends preload

queue.on("complete", loadingComplete, this);

function loadingComplete() {
  // assigns canvas, stage and details
  canvas = document.getElementById('canvas');
  scoreP = document.getElementById('score');
  livesP = document.getElementById('lives');
  levelP = document.getElementById('level');
  stage = new createjs.Stage(canvas);
  stage.canvas.style.cursor = 'none';

  // assigns sonic to mouse
  mouse = queue.getResult('sonic');

  // watches for mouse/key presses
  stage.addEventListener('stagemousemove', moveHandler);
  canvas.onmousedown = onMouseDown;
  canvas.onmouseup = onMouseUp;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  // SHOULD CHANGE THIS TO TITLE SCREEN
  // sets first level
  resetGame('Click to Start!');
  // create main game loop
  createjs.Ticker.addEventListener('tick', handleTick);
};

function handleLoad(event) {
  // plays theme song
  createjs.Sound.play('theme', {loop:-1}); // -1 infinite
}

function moveHandler() {
  // keeps sonic at mouse
  mouseBp.x = stage.mouseX;
  mouseBp.y = stage.mouseY;
};