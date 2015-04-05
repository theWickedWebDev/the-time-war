      // defaults
      var numOfDaleks = 5;
      var dalekSpeed = 5;

      var canvas, stage, bg, score, bitmap;
      var bmpList = [];
      var play, gameTxt;
      var mouseTarget, clicked, mouseBp, mouse;
      var explosion;
      var dalekImage;

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
      queue.loadManifest(images);  
      createjs.Sound.addEventListener("fileload", handleLoad);
      queue.on("complete", start, this);

      createjs.Sound.alternateExtensions = ["mp3"];
        
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
        rose = queue.getResult('rose');

        canvas.onmousedown = onMouseDown;
        canvas.onmouseup = onMouseUp;

        setBG();
        createDaleks();
        setSonic();
        gameOver();
      }

      
      function handleLoad(event) {
          createjs.Sound.play('theme', {loop:-1});
      }
      
      function moveHandler() {
        mouseBp.x = stage.mouseX - 5;
        mouseBp.y = stage.mouseY - 5;
      };

      function setSonic() {
        mouseBp = new createjs.Bitmap(mouse);
        stage.addChild(mouseBp);
        stage.update();
      };

      function createDaleks() {
        var container = new createjs.Container();
        stage.addChild(container);
        var l = numOfDaleks;
        bmpList = [];
        for (i=0;i<l;i++) {
          bitmap = new createjs.Bitmap(dalekImage);
          container.addChild(bitmap);
          bitmap.name = "dalek" + i;
          resetEnemy(bitmap);
          bitmap.regX = bitmap.image.width/2|0;
          bitmap.regY = bitmap.image.height/2|0;
          bitmap.mouseEnabled = true;
          bmpList.push(bitmap)
        }
        createjs.Ticker.addEventListener('tick', handleTick);
      };

      function setBG() {
        var bgrnd = new createjs.Bitmap(bg);
        stage.addChild(bgrnd);
        stage.update();
        createDaleks;
      };

      function resetEnemy(enemy) {
        enemy.x = canvas.width + Math.random()*300;
        enemy.y = (canvas.height - 100) * Math.random()+50;
        enemy.speed = (Math.random()*5) + dalekSpeed;
      };

      function handleTick() {
        //checking clicks
        if (!clicked && stage.mouseX && stage.mouseY) {
          mouseTarget = stage.getObjectUnderPoint(mouseBp.x,mouseBp.y); 
        }

        if (clicked && mouseTarget) {
          var tempText = String(mouseTarget.name);
          tempText = tempText.substring(0,5);
          if (tempText!=null && tempText=='dalek') {
            
            // explosions
            
            explosion = new Image();
            explosion.src = 'assets/explosion.png';
            var data = {
              framerate: 10,
              images: [explosion],
              frames: {width:64, height:64, regX:32, regY:32},
              animations: {
                  'explode': [0, 25,null,4]
              }
            }

            var spritesheet = new createjs.SpriteSheet(data);
            var animation = new createjs.Sprite(spritesheet, 'explode');
            animation.x = mouseTarget.x;
            animation.y = mouseTarget.y;
            stage.addChild(animation);
            animation.on("animationend", handleExplosionEnd);
            function handleExplosionEnd(event) {
                if (event.name == "explode") { // For example
                    event.remove();
                    stage.removeChild(animation);
                }
            }

            // play sonic sound
            createjs.Sound.play('sonic');

            // resets
            resetEnemy(mouseTarget);
            score += 50;
            scoreP.innerText = "Score: " + score;
            clicked = false;
          }
        }

        //moving daleks
        if (play == true) {
          var l = bmpList.length;
          for (var i=0;i<l;i++) {
            var bmp = bmpList[i];
            if (bmp.x > -20) {
              bmp.x -= bmp.speed;
            } else {
              createjs.Sound.play('exterminate');
              gameOver();
            }
          }
        }

        stage.update();
        canvas.onclick = handleClick;
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
      };

      function handleKeyDown(event) {
        if (event.keyCode == 32) {
          event.preventDefault();
          clicked = true;
        }
      };

      function handleKeyUp(event) {
        if (event.keyCode == 32) {
          event.preventDefault();
          clicked = false;
        }
      };

      function handleClick() {
        canvas.onclick = null;
        stage.removeChild(gameTxt);
        play = true;
      };

      function onMouseDown() {
        if(!e){var e = window.event;}
        clicked = true;
      };

      function onMouseUp() {
        clicked = false;
      };

      function gameOver() {
        gameTxt = new createjs.Text('Click to play!', '36px Ariel', '#fff');
        gameTxt.textAlign = "center";
        gameTxt.x = canvas.width/2;
        gameTxt.y = canvas.height/2;
        stage.addChild(gameTxt);
        play = false;
        score = 0;
        var l = bmpList.length;
        for (var i=0;i<l;i++) {
          var bmp = bmpList[i];
          resetEnemy(bmp);
        }
        stage.update();
      };