var game;
var gameOptions = {
    tileSize: 200,
    tweenSpeed: 50,
    tileSpacing: 20,
    localStorageName: "StarMatchSlide"
}
var ROW = 0;
var COL = 1;
var scorePass = 0;
window.onload = function() {
    var gameConfig = {
       type: Phaser.CANVAS,
       width: gameOptions.tileSize * 4 + gameOptions.tileSpacing * 5,
       height: (gameOptions.tileSize * 4 + gameOptions.tileSpacing * 5) * 16 / 9,
       backgroundColor: "#143db8",
       scene: [preloadAssets, introGame, playGame, endGame]
   };
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);

}

var preloadAssets = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function preloadAssets(){
        Phaser.Scene.call(this, {key: "PreloadAssets"});
    },
    preload: function(){
        this.load.image("spot", "assets/sprites/spot.png");
        this.load.image("spot2", "assets/sprites/spot2.png");
        this.load.image("gametitle", "assets/sprites/gametitle5.png");
        this.load.image("start", "assets/sprites/start2.png");
        this.load.image("restart", "assets/sprites/restart2.png");
        this.load.image("moreGames", "assets/sprites/moreGames.png");
        this.load.image("scorepanel", "assets/sprites/scorepanelWithLabel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels850.png");
        this.load.image("logo", "assets/sprites/logo2.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay2.png");
        this.load.image("gameOver", "assets/sprites/gameOver.png");
        this.load.spritesheet("tiles", "assets/sprites/tiles3.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.xml");
        this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
        this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);
        this.load.audio("grow2", [ "assets/sounds/grow2.mp3"]);
        this.load.audio("grow3", ["assets/sounds/grow3.mp3"]);
        this.load.audio("grow4", [ "assets/sounds/grow4.mp3"]);
        this.load.audio("grow5", [ "assets/sounds/grow5.mp3"]);
        this.load.audio("grow6", [ "assets/sounds/grow6.mp3"]);
        this.load.audio("grow7", [ "assets/sounds/grow7.mp3"]);
        this.load.audio("backMusic", ["assets/sounds/loop.mp3"]);
    },
    create: function(){
        this.scene.start("IntroGame");
    }
})
var introGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function introGame() {
        Phaser.Scene.call(this, { key: "IntroGame" });
    },
    create: function () {
        var startButton = this.add.sprite(450, 705, "start");
        startButton.setDisplaySize(1000, 1400);
        startButton.setInteractive();
        startButton.on("pointerdown", function () {
            this.scene.start("PlayGame");
          
        }, this)
        this.startText = this.add.bitmapText(200, 225, "font", "Start",56);
    }
});

var playGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function playGame(){
        Phaser.Scene.call(this, { key: "PlayGame" });
        
    },
    
    create: function(){
        this.fieldArray = [];
        this.fieldGroup = this.add.group();
        this.score = 0;
        this.bestScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        for(var i = 0; i < 4; i++){
            this.fieldArray[i] = [];
            for(var j = 0; j < 4; j++){
                var spot = this.add.sprite(this.tileDestination(j, COL), this.tileDestination(i, ROW), "spot")
      
                var tile = this.add.sprite(this.tileDestination(j, COL), this.tileDestination(i, ROW), "tiles");
                tile.alpha = 0;
                tile.visible = 0;
                this.fieldGroup.add(tile);
                this.fieldArray[i][j] = {
                    tileValue: 0,
                    tileSprite: tile,
                    canUpgrade: true
                }
            }
        }
        backMusic = this.sound.add("backMusic", {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        })
    
        backMusic.play();
        function handleVisibilityChange() {
            //console.log("hidden = " + hidden);
            if (document.hidden || hidden == 'webkitHidden' || hidden == 'hidden') {
              
                backMusic.pause();
                hidden = 'not'
            } else {
             
                backMusic.resume();
            }
        }
     
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        // Warn if the browser doesn't support addEventListener or the Page Visibility API
         
        
            // Handle page visibility change   
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        



            //this.backMusic;
            var moreGamesButton = this.add.sprite((game.config.width / 4 )* 3, 1350, "moreGames");
            moreGamesButton.setInteractive();
            moreGamesButton.on("pointerdown", function () {
                backMusic.stop();
                window.open("https://play.google.com/store/apps/dev?id=8098884313818524240", "_blank");
            }, this)
            var restartButton = this.add.sprite(game.config.width/4, 1350, "restart");
        restartButton.setInteractive();
        restartButton.on("pointerdown", function () {
            backMusic.stop();
            this.scene.start("PlayGame");
        }, this)
         this.add.sprite(this.tileDestination(1, COL) + 100, this.tileDestination(0, ROW) - 290, "scorepanel");
        //this.add.sprite(this.tileDestination(1, COL)+ 130, this.tileDestination(0, ROW) - 300, "scorelabels");
        //this.add.sprite(8, 5, "gametitle").setOrigin(0, 0);
        //var howTo = this.add.sprite(game.config.width, 5, "howtoplay");
        //howTo.setOrigin(1, 0);
        //var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        //logo.setOrigin(0.5, 1);
        //logo.setInteractive();
        //logo.on("pointerdown", function(){
        //    window.location.href = "http://guighostgames.com"
        //});
        this.scoreText = this.add.bitmapText(this.tileDestination(0, COL) + 30, this.tileDestination(0, ROW) - 290, "font", "0");
        this.bestScoreText = this.add.bitmapText(this.tileDestination(2, COL) +120, this.tileDestination(0, ROW) - 290, "font", this.bestScore.toString());
        this.instruction2 = this.add.text(90, 1200, 'Swipe Up, Left, Down, or Right to merge the stars', { fontSize: '32px', fill: '#f1f442', fontFamily: 'Segoe UI' });

        this.input.keyboard.on("keydown", this.handleKey, this);
        this.canMove = false;
        this.addTile();
        this.addTile();
        this.input.on("pointerup", this.endSwipe, this);
        this.moveSound = this.sound.add("move");
        this.growSound = this.sound.add("grow");
        this.growSound2 = this.sound.add("grow2");
        this.growSound3 = this.sound.add("grow3");
        this.growSound4 = this.sound.add("grow4");
        this.growSound5 = this.sound.add("grow5");
        this.growSound6 = this.sound.add("grow6");
        this.growSound7 = this.sound.add("grow7");
  
        
        
    },
    endSwipe: function(e){
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            var children = this.fieldGroup.getChildren();
            if(swipeNormal.x > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.width - children[i].x;
                }
                this.handleMove(0, 1);
            }
            if(swipeNormal.x < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].x;
                }
                this.handleMove(0, -1);
            }
            if(swipeNormal.y > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.height - children[i].y;
                }
                this.handleMove(1, 0);
            }
            if(swipeNormal.y < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].y;
                }
                this.handleMove(-1, 0);
            }
        }
    },
    addTile: function(){
        var emptyTiles = [];
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.fieldArray[i][j].tileValue == 0){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var chosenTile = Phaser.Utils.Array.GetRandomElement(emptyTiles);
            this.fieldArray[chosenTile.row][chosenTile.col].tileValue = 1;
            this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
            this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
            this.tweens.add({
                targets: [this.fieldArray[chosenTile.row][chosenTile.col].tileSprite],
                alpha: 1,
                duration: gameOptions.tweenSpeed,
                onComplete: function(tween){
                    tween.parent.scene.canMove = true;
                },
            });
        }
	},
    handleKey: function(e){
        if(this.canMove){
            var children = this.fieldGroup.getChildren();
            switch(e.code){
                case "KeyA":
                case "ArrowLeft":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].x;
                    }
                    this.handleMove(0, -1);
                    break;
                case "KeyD":
                case "ArrowRight":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.width - children[i].x;
                    }
                    this.handleMove(0, 1);
                    break;
                case "KeyW":
                case "ArrowUp":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].y;
                    }
                    this.handleMove(-1, 0);
                    break;
                case "KeyS":
                case "ArrowDown":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.height - children[i].y;
                    }
                    this.handleMove(1, 0);
                    break;
            }
        }
    },
    handleMove: function(deltaRow, deltaCol){
        this.canMove = false;
        var somethingMoved = false;
        this.movingTiles = 0;
        var moveScore = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var colToWatch = deltaCol == 1 ? (4 - 1) - j : j;
                var rowToWatch = deltaRow == 1 ? (4 - 1) - i : i;
                var tileValue = this.fieldArray[rowToWatch][colToWatch].tileValue;
                if(tileValue != 0){
                    var colSteps = deltaCol;
                    var rowSteps = deltaRow;
                    while(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == 0){
                        colSteps += deltaCol;
                        rowSteps += deltaRow;
                    }
                    if(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && (this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == tileValue) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade && this.fieldArray[rowToWatch][colToWatch].canUpgrade && tileValue < 12){
                        this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue ++;
                        moveScore += Math.pow(2, this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue);
                        this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade = false;
                        this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                        this.moveTile(this.fieldArray[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), true);
                        somethingMoved = true;
                    }
                    else{
                        colSteps = colSteps - deltaCol;
                        rowSteps = rowSteps - deltaRow;
                        if(colSteps != 0 || rowSteps != 0){
                            this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue = tileValue;
                            this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                            this.moveTile(this.fieldArray[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), false);
                            somethingMoved = true;
                        }
                        
                    }
                }
            }
        }
        if(!somethingMoved){
            this.canMove = true;
            var emptyTiles2 = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.fieldArray[i][j].tileValue == 0) {
                        emptyTiles2.push({
                            row: i,
                            col: j
                        })
                    }
                }
            }
            if (emptyTiles2.length == 0) {
                console.log("no more movez");
                scorePass = this.score;
                this.scene.start("EndGame", true, true, { currentScore: this.score });
                //var spot2 = this.add.sprite(150,200, "spot2")
                //var restartButton2 = this.add.sprite(300, 400 , "restart");
                //restartButton2.setInteractive();
                //restartButton2.on("pointerdown", function () {
                //    this.scene.start("PlayGame");
                //}, this)
              
            }
        }
        else{
            this.moveSound.play();
            this.score += moveScore;
            if(this.score > this.bestScore){
                this.bestScore = this.score;
                localStorage.setItem(gameOptions.localStorageName, this.bestScore);
            }
        }
    },
    moveTile: function(tile, row, col, distance, changeNumber){
        this.movingTiles ++;
        this.tweens.add({
            targets: [tile.tileSprite],
            x: this.tileDestination(col, COL),
            y: this.tileDestination(row, ROW),
            duration: gameOptions.tweenSpeed * distance,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(changeNumber){
                    tween.parent.scene.transformTile(tile, row, col);
                }
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    transformTile: function(tile, row, col){
     
        console.log("logging tile " + this.fieldArray[row][col].tileValue)
        var tileValueThisTime = this.fieldArray[row][col].tileValue;
        switch (tileValueThisTime) {
      
            case 1:
                this.growSound.play();
                break;
            case 2:
                this.growSound2.play();
                break;
            case 3:
                this.growSound3.play();
                break;
            case 4:
                this.growSound4.play();
                break;
            case 5:
                this.growSound5.play();
                break;
            case 6:
                this.growSound6.play();
                break;
            case 7:
                this.growSound7.play();
                break;
            default:
                this.growSound.play();
        }



        this.movingTiles ++;
        tile.tileSprite.setFrame(this.fieldArray[row][col].tileValue - 1);
        this.tweens.add({
            targets: [tile.tileSprite],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: gameOptions.tweenSpeed,
            yoyo: true,
            repeat: 1,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    resetTiles: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                this.fieldArray[i][j].canUpgrade = true;
                this.fieldArray[i][j].tileSprite.x = this.tileDestination(j, COL);
                this.fieldArray[i][j].tileSprite.y = this.tileDestination(i, ROW);
                if(this.fieldArray[i][j].tileValue > 0){
                    this.fieldArray[i][j].tileSprite.alpha = 1;
                    this.fieldArray[i][j].tileSprite.visible = true;
                    this.fieldArray[i][j].tileSprite.setFrame(this.fieldArray[i][j].tileValue - 1);
                }
                else{
                    this.fieldArray[i][j].tileSprite.alpha = 0;
                    this.fieldArray[i][j].tileSprite.visible = false;
                }
            }
        }
    },
    isInsideBoard: function(row, col){
        return (row >= 0) && (col >= 0) && (row < 4) && (col < 4);
    },
    tileDestination: function(pos, axis){
        var offset = (axis == ROW) ? (game.config.height - game.config.width) / 2 - 60 : 0;
        return pos * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSize / 2 + gameOptions.tileSpacing + offset;
    }
});

var endGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function endGame() {
        Phaser.Scene.call(this, { key: "EndGame" });
    },
    create: function () {
        var spot2 = this.add.sprite(450, 800, "spot2")
        //this.scoreText2 = this.add.bitmapText(450, 500, "font", "Game Over");
        var scoreEnd = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
       
        var gOver = this.add.sprite(450, 550, "gameOver");
  
        var overText = this.add.text(200, 650, 'Score This Round', { fontSize: '64px', fill: '#000', fontFamily: 'Comic sans ms' });
        var thisRoundScore = this.add.bitmapText(390, 750, "font", scorePass.toString());
        var overText2 = this.add.text(200, 850, 'Your Best Score', { fontSize: '64px', fill: '#000', fontFamily: 'Comic sans ms' });
        this.bestScoreText2 = this.add.bitmapText(390, 950, "font", scoreEnd.toString());

        var restartButton2 = this.add.sprite(450, 1200, "restart");
        restartButton2.setInteractive();
        var adOnly1time = 0;
        restartButton2.on("pointerdown", function () {
                        if (adOnly1time == 0) { localStorage.setItem('ShowAd', 1); adOnly1time = 1; }
                        else {
                            backMusic.stop();
                            this.scene.start("PlayGame");
                            adOnly1time = 0;
                            localStorage.setItem('ShowAd', 0);
                        }
            
        }, this)
    }
});

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
