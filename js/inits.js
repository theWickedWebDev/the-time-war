// defaults
var numOfDaleks;
var dalekSpeed = 1;
var companionSpeed = 10;
var companionRarity = 997; // 1-1000(not rare to rare)

var canvas, stage, bg, bitmap, container;
var score = 0;
var bmpList = [];
var play, gameTxt, bgrnd;
var mouseTarget, clicked, mouseBp, mouse;
var explosion;
var dalekImage;
var companionImage, companion, companionOut;
var level = 1;
var queue = new createjs.LoadQueue();
var audioPath = 'assets/';

var sounds = [
    {id:'sonic', src:'sonic.mp3'},
    {id:'exterminate', src:'exterminate.mp3'},
    {id:'theme', src:'theme.mp3'}
];

var chars = [
  {id: 'rose', src:'assets/rose.png'}
];

var sonic = [
  {id: 'sonic', src:'assets/sonic.png'}
];

var daleks = [
  {id: 'explosion', src:'assets/explosion.png'},
  {id: 'dalek1', src:'assets/dalek.png'},
  {id: 'dalek2', src:'assets/dalek2.png'},
  {id: 'dalek3', src:'assets/dalek3.png'},
  {id: 'dalek4', src:'assets/dalek4.png'},
  {id: 'dalek5', src:'assets/dalek5.png'}
]

var levels = [
  {id: 'level1', src:'assets/gallifrey2.jpg'},
  {id: 'level2', src:'assets/space.jpg'},
  {id: 'level3', src:'assets/gallifrey.jpg'},
  {id: 'level4', src:'assets/space2.jpg'},
  {id: 'level5', src:'assets/badwolf.jpg'},
  {id: 'level6', src:'assets/tardisexplode.jpg'}
]

// preloads images
queue.loadManifest(chars); 
queue.loadManifest(levels); 
queue.loadManifest(sonic); 
queue.loadManifest(daleks); 
queue.on("complete", loadingComplete, this);

createjs.Sound.registerSounds(sounds, audioPath); 
createjs.Sound.alternateExtensions = ["mp3"]; 
createjs.Sound.addEventListener("fileload", handleLoad);

  
function loadingComplete() {
  // assigns canvas, stage and details
  canvas = document.getElementById('canvas');
  scoreP = document.getElementById('score');
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
};

function handleLoad(event) {
  // plays theme song
  createjs.Sound.play('theme', {loop:-1}); // -1 infinite
}

function moveHandler() {
  // keeps sonic at mouse
  mouseBp.x = stage.mouseX - 5;
  mouseBp.y = stage.mouseY - 5;
};