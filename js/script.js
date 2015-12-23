(function(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  console.log("width", windowWidth)
  console.log("height", windowHeight)

  var game = new Phaser.Game(windowWidth,windowHeight, Phaser.AUTO, 'game', {preload: preload, create: create});

  var background;
  var left = false;
  var right = false;
  var jump = false;

    function preload() {
      game.load.image('mainpage', "./assets/main.png");
      game.load.image('button', "./assets/button.png");
      game.load.image('title', "./assets/title.png");
      game.load.image('over', "./assets/gameover.png");
      game.load.image('lose', "./assets/lose.png");
      game.load.image('win', "./assets/win.png");
      game.load.image('jump', "./assets/jump.png");
      game.load.image('left', "./assets/left.png");
      game.load.image('right', "./assets/right.png");

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    };



    function create() {
      if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices

      mainpageBackground = game.add.image(0, 0, "mainpage");
      mainpageBackground.width = windowWidth;
      mainpageBackground.height = windowHeight;
      title = game.add.image(0, windowWidth/6, 'title');
      title.width = windowWidth;
      title.height = 200;
      var startButton = game.add.button(windowWidth/2 - 100, windowHeight/2, 'button', actionOnClick, this, 2, 1, 0).scale.setTo(1.5,1.5);

    };

    function actionOnClick() {
      document.getElementById('game').innerHTML = ''
      window.onload = startGame();
    };




  function startGame() {
      //creates an instance of Phaser.Game object
      // param width and height, render context,
      var game = new Phaser.Game(windowWidth,windowHeight, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

      function preload() {
        //graphics
        game.load.image('snow', "./assets/snow.png");
        game.load.image('platform', "./assets/platform.png");
        game.load.image('monkey', "./assets/monkey.png");
        game.load.image('bowl', "./assets/bowl.png");
        game.load.image('jump', "./assets/jump.png");
        game.load.image('left', "./assets/left.png");
        game.load.image('right', "./assets/right.png");


        //sprite
        //params are pixel of width and height
        game.load.spritesheet("shev", "./assets/shev.png", 33, 52);

        //audio
        //game.load.audio("sound", "./assets/8bit-thriller.mp3");

      } //preload

      // sets initial score to 0
      var score = 0;
      var scoreText;

      function create() {
        //enables arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //sound play
        var music = game.add.audio("sound")
        music.play();

        //scrolling background
        var gameBackground = game.add.tileSprite(0, 0, windowWidth, windowHeight, 'snow');
        gameBackground.autoScroll(0, 25);

        //set graphics

        platforms = game.add.group();
        //enable physics on platform (gives collision to this item)
        platforms.enableBody = true;

        //creates ground, params are x-position, y-position, file
       var ground = platforms.create(0, game.world.height - 40, "platform");
       ground.scale.setTo(2,2)
       //immovable holds item in place, providing collision for ground after jumping
       ground.body.immovable = true;

       ground = platforms.create(375, game.world.height - 40, "platform");
       ground.scale.setTo(2,2)
       ground.body.immovable = true;

       ground = platforms.create(750, game.world.height - 40, "platform");
       ground.scale.setTo(2,2)
       ground.body.immovable = true;

       ground = platforms.create(1125, game.world.height - 40, "platform");
       ground.scale.setTo(2,2)
       ground.body.immovable = true;

       var ledge = platforms.create(Math.random()*320, 300, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+600, 600, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 900, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+600, 900, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 1200, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 1500, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+ 600, 1500, "platform");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+ 600, 1800, "platform");
       ledge.body.immovable = true;

       //set player

       player = game.add.sprite(32, game.world.height - 150, "shev");
       player.scale.setTo(1.5,1.5)
       //enables physics for player
       game.physics.arcade.enable(player);

       //gives player physics properties
        player.body.bounce.y = .2;
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;

        // Our animations for walking left and right
        player.animations.add('left', [0,1,2,3], 10, true)
        player.animations.add('right', [5,6,7,8], 10, true)

        //this is controls, (arrow Keys)

        var jumpButton = game.add.button(game.world.width-100, game.world.height-100, 'jump', null, this, 0, 1, 0, 1);
        //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        jumpButton.events.onInputOver.add(function(){jump=false;});
        jumpButton.events.onInputOut.add(function(){jump=false;});
        jumpButton.events.onInputDown.add(function(){jump=true;});
        jumpButton.events.onInputUp.add(function(){jump=false;});

        var leftButton = game.add.button(0, game.world.height-110, 'left', null, this, 0, 1, 0 ,1);
        leftButton.scale.setTo(0.25, 0.25);
        leftButton.events.onInputOver.add(function(){left=true;});
        leftButton.events.onInputOut.add(function(){left=false;});
        leftButton.events.onInputDown.add(function(){left=true;});
        leftButton.events.onInputUp.add(function(){left=false;});

        var rightButton = game.add.button(120, game.world.height-110, 'right', null, this, 0, 1, 0 ,1);
        rightButton.scale.setTo(0.25, 0.25);
        rightButton.events.onInputOver.add(function(){right=true;});
        rightButton.events.onInputOut.add(function(){right=false;});
        rightButton.events.onInputDown.add(function(){right=true;});
        rightButton.events.onInputUp.add(function(){right=false;});



        //collect monkeys
        monkeys = game.add.group()
        monkeys.enableBody = true;

        //number of monkeys dropped
        for (var i = 0; i < 10; i++) {
            //params (spacing between monkeys and y coordinate drop, file)
            var monkey = monkeys.create( i * (windowWidth/10) , Math.random()* windowHeight - 100, "monkey")
            monkey.body.gravity.y = 125;
            monkey.body.bounce.y = 0.4 + Math.random()*0.2;
        }

        bowls = game.add.group()
        bowls.enableBody = true;

        for (var i = 0; i < 10; i++) {
            //params (spacing between monkeys and y coordinate drop, file)
            var bowl = bowls.create( i * (windowWidth/10) , Math.random()* windowHeight - 100, "bowl")
            bowl.body.gravity.y = 125;
            bowl.body.bounce.y = 0.4 + Math.random()*0.2;
        }

        scoreText = game.add.text(16, 16, 'Score: 0', {fill: '#FFF'});

        TimerText = game.add.text(16, 38, 'Timer: 0', {fill: '#FFF'});
      } //create

      function update(){

        cursors = game.input.keyboard.createCursorKeys()
        //player will land on the platforms
        game.physics.arcade.collide(player, platforms);
        //monkeys will land on the platforms
        game.physics.arcade.collide(monkeys, platforms);

        game.physics.arcade.collide(bowls, platforms);
        //check to see if player and monkey overlap
        game.physics.arcade.overlap(player, monkeys, collectmonkey, null, this);

        game.physics.arcade.overlap(player, bowls, collectbowl, null, this);


        player.body.velocity.x = 0;
        //this is the movements for the sprite
        if (cursors.left.isDown || left){
            player.body.velocity.x = -200;
            player.animations.play('left');
        } else if (cursors.right.isDown || right){
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if ( player.body.touching.down ) {
            jumpTimes = 0;
            }

        if ( game.input.keyboard.isDown(Phaser.Keyboard.UP) || jump) {
            jumpTimes ++
              if (jumpTimes <= 2){
               player.body.velocity.y = -650;
              }
            }



      } //update
      var restart = false;
      var gameOver = false;

      function collectmonkey(player, monkey){
        //removes monkey when player collides
        monkey.kill();
        score+=5;
        scoreText.text = 'Score: ' + score;
        scoring()
      }

      function collectbowl(player, bowl){
        //removes monkey when player collides
        bowl.kill();
        score+=10;
        scoreText.text = 'Score: ' + score;
        scoring()
      }

      function scoring(){
        if(score === 150){
          clearTimer();
          restart = true;
          // location.reload()
          document.getElementById('game').innerHTML = ''
          gameEnd();
        }
      }


     var timer = 31;


     var myInterval = setInterval(function() {
        timer --
        console.log(timer)
        TimerText.text = 'Timer: ' + timer
        if (timer == 0) {
          // alert("you lose")
          gameOver = true;
          clearTimer();
          console.log(gameOver)
          // location.reload()
          document.getElementById('game').innerHTML = ''
          gameEnd();
        }
     },1000)

     var clearTimer = function(){
       clearInterval(myInterval)
     }

     function gameEnd(){
       var game = new Phaser.Game(windowWidth,windowHeight, Phaser.AUTO, 'game', {preload: preload, create: create});

       function preload() {
         game.load.image('mainpage', "./assets/main.png");
         game.load.image('again', "./assets/again.png");
         game.load.image('over', "./assets/gameover.png");
         game.load.image('lose', "./assets/lose.png");
         game.load.image('win', "./assets/win.png");
       };

       function create() {
         mainpageBackground = game.add.image(0, 0, "mainpage");
         mainpageBackground.width = windowWidth;
         mainpageBackground.height = windowHeight;
         //var start = game.add.text(16, 16, 'Start Game', {fill: '#FFF'});
         if (gameOver == true){
         game.add.image(windowWidth/2 - 200, 100, 'over').scale.setTo(0.5,0.5);
         game.add.image(windowWidth/2 - 250, 200, 'lose').scale.setTo(0.5,0.5);
         var button = game.add.button(game.world.centerX - 105, 325, 'again', actionOnClick, this, 2, 1, 0);
       } else if (restart == true){
         game.add.image(windowWidth/2 - 200, 100, 'over').scale.setTo(0.5,0.5);
          game.add.image(windowWidth/2 - 250, 200, 'win').scale.setTo(0.5,0.5);
          var button = game.add.button(0, 0, 'again', actionOnClick, this, 2, 1, 0);
       }
       };

       function actionOnClick() {
         document.getElementById('game').innerHTML = ''
         game.destroy();
         window.onload= startGame();
       }
     }
  } // startGame

     function gofull() { game.scale.startFullScreen(false);}

})();
