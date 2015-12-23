(function(){
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  console.log("width", windowWidth)
  console.log("height", windowHeight)

    var game = new Phaser.Game(windowWidth,windowHeight, Phaser.AUTO, 'game', {preload: preload, create: create});

    function preload() {
      game.load.image('mainpage', "./assets/main.png");
      game.load.image('button', "./assets/button.png");
      game.load.image('title', "./assets/title.png");
      game.load.image('over', "./assets/gameover.png");
      game.load.image('lose', "./assets/lose.png");
      game.load.image('win', "./assets/win.png");

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    };

    var background;

    function create() {
      if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices

      mainpageBackground = game.add.image(0, 0, "mainpage");
      mainpageBackground.width = windowWidth;
      mainpageBackground.height = windowHeight;
      title = game.add.image(0, windowWidth/6, 'title');
      title.width = windowWidth;
      title.height = 200;
      var button = game.add.button(windowWidth/2 - 100, windowHeight/2, 'button', actionOnClick, this, 2, 1, 0).scale.setTo(1.5,1.5);

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
        game.load.image('dirt', "./assets/dirt.png");
        game.load.image('bone', "./assets/platform.png");
        game.load.image('pumpkin', "./assets/pumpkin.png");
        game.load.image('corn', "./assets/candycorn.png");

        //sprite
        //params are pixel of width and height
        game.load.spritesheet("zombie", "./assets/zombie.png", 33, 52);

        //audio
        game.load.audio("sound", "./assets/8bit-thriller.mp3");

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
        var gameBackground = game.add.tileSprite(0, 0, windowWidth, windowHeight, 'dirt');
        gameBackground.autoScroll(0, 25);

        //set graphics

        platforms = game.add.group();
        //enable physics on platform (gives collision to this item)
        platforms.enableBody = true;

        //creates ground, params are x-position, y-position, file
       var ground = platforms.create(0, game.world.height - 40, "bone");
       ground.scale.setTo(2,2)
       //immovable holds item in place, providing collision for ground after jumping
       ground.body.immovable = true;

       ground = platforms.create(375, game.world.height - 40, "bone");
       ground.scale.setTo(2,2)
       ground.body.immovable = false;

       ground = platforms.create(750, game.world.height - 40, "bone");
       ground.scale.setTo(2,2)
       ground.body.immovable = false;

       ground = platforms.create(1125, game.world.height - 40, "bone");
       ground.scale.setTo(2,2)
       ground.body.immovable = false;

       var ledge = platforms.create(Math.random()*320, 300, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+600, 600, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 900, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+600, 900, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 1200, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create(Math.random()*320, 1500, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+ 600, 1500, "bone");
       ledge.body.immovable = true;

       ledge = platforms.create((Math.random()*320)+ 600, 1800, "bone");
       ledge.body.immovable = true;

       //set player

       player = game.add.sprite(32, game.world.height - 150, "zombie");
       player.scale.setTo(1.5,1.5)
       //enables physics for player
       game.physics.arcade.enable(player);

       //gives player physics properties
        player.body.bounce.y = .5;
        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;

        // Our animations for walking left and right
        player.animations.add('left', [0,1,2,3], 10, true)
        player.animations.add('right', [5,6,7,8], 10, true)

        //this is controls, (arrow Keys)

        //collect pumpkins
        pumpkins = game.add.group()
        pumpkins.enableBody = true;

        //number of pumpkins dropped
        for (var i = 0; i < 10; i++) {
            //params (spacing between pumpkins and y coordinate drop, file)
            var pumpkin = pumpkins.create( i * 120 , Math.random()* 500, "pumpkin")
            pumpkin.body.gravity.y = 125;
            pumpkin.body.bounce.y = 0.4 + Math.random()*0.2;
        }

        corns = game.add.group()
        corns.enableBody = true;

        for (var i = 0; i < 10; i++) {
            //params (spacing between pumpkins and y coordinate drop, file)
            var corn = corns.create( i * 130 , Math.random()* 500, "corn")
            corn.body.gravity.y = 125;
            corn.body.bounce.y = 0.4 + Math.random()*0.2;
        }

        scoreText = game.add.text(16, 16, 'Score: 0', {fill: '#FFF'});

        TimerText = game.add.text(16, 38, 'Timer: 0', {fill: '#FFF'});
      } //create

      function update(){

        cursors = game.input.keyboard.createCursorKeys()
        //player will land on the platforms
        game.physics.arcade.collide(player, platforms);
        //pumpkins will land on the platforms
        game.physics.arcade.collide(pumpkins, platforms);

        game.physics.arcade.collide(corns, platforms);
        //check to see if player and pumpkin overlap
        game.physics.arcade.overlap(player, pumpkins, collectPumpkin, null, this);

        game.physics.arcade.overlap(player, corns, collectCorn, null, this);


        player.body.velocity.x = 0;
        //this is the movements for the sprite
        if (cursors.left.isDown){
            player.body.velocity.x = -200;

            player.animations.play('left');
        } else if (cursors.right.isDown){
            player.body.velocity.x = 200;

            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if ( player.body.touching.down ) {
            jumpTimes = 0;
            }

        if ( game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            jumpTimes ++
              if (jumpTimes <= 2){
               player.body.velocity.y = -850;
              }
            }



      } //update
      var restart = false;
      var gameOver = false;

      function collectPumpkin(player, pumpkin){
        //removes pumpkin when player collides
        pumpkin.kill();
        score+=5;
        scoreText.text = 'Score: ' + score;
        scoring()
      }

      function collectCorn(player, corn){
        //removes pumpkin when player collides
        corn.kill();
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


     var timer = 31


     var myInterval = setInterval(function() {
        timer --
        console.log(timer)
        TimerText.text = 'Timer ' + timer
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
         game.add.image(80, 100, 'over').scale.setTo(0.5,0.5);
         game.add.image(680, 100, 'lose').scale.setTo(0.5,0.5);
         var button = game.add.button(game.world.centerX - 105, 325, 'again', actionOnClick, this, 2, 1, 0);
       } else if (restart == true){
         game.add.image(80, 100, 'over').scale.setTo(0.5,0.5);
          game.add.image(680, 100, 'win').scale.setTo(0.5,0.5);
          var button = game.add.button(game.world.centerX - 105, 325, 'again', actionOnClick, this, 2, 1, 0);
       }
       };

       function actionOnClick() {
         document.getElementById('game').innerHTML = ''
         game.destroy();
         window.onload= startGame();
       }
     }
  } // startGame

})();
