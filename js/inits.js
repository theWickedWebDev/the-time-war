// defaults
var numOfDaleks = 5;
var dalekSpeed = 5;
var companionSpeed = 10;
var companionRarity = 998; // 1-1000(not rare to rare)

var canvas, stage, bg, score, bitmap;
var bmpList = [];
var play, gameTxt;
var mouseTarget, clicked, mouseBp, mouse;
var explosion;
var dalekImage;
var companionImage, companion, companionOut;

var queue = new createjs.LoadQueue();

var audioPath = 'assets/';
var sounds = [
    {id:'sonic', src:'sonic.mp3'},
    {id:'exterminate', src:'exterminate.mp3'},
    {id:'theme', src:'theme.mp3'}
];

var images = [
  {id: 'gallifrey', src:'assets/gallifrey2.jpg'},
  {id: 'space', src:'assets/space.jpg'},
  {id: 'dalek', src:'assets/dalek.png'},
  {id: 'sonic', src:'assets/sonic.png'},
  {id: 'explosion', src:'assets/explosion.png'},
  {id: 'rose', src:'assets/rose.png'}
]

createjs.Sound.registerSounds(sounds, audioPath); 
createjs.Sound.alternateExtensions = ["mp3"];
queue.loadManifest(images);  
createjs.Sound.addEventListener("fileload", handleLoad);
queue.on("complete", start, this);

  
function start() {
  canvas = document.getElementById('canvas');
  scoreP = document.getElementById('score');
  stage = new createjs.Stage(canvas);
  score = 0;
  stage.canvas.style.cursor = 'none';
  stage.addEventListener('stagemousemove', moveHandler);

  bg = queue.getResult('gallifrey');
  dalekImage = queue.getResult('dalek');
  mouse = queue.getResult('sonic');
  companionImage = queue.getResult('rose');

  canvas.onmousedown = onMouseDown;
  canvas.onmouseup = onMouseUp;

  setBG();
  createDaleks();
  setSonic();
  gameOver();
}