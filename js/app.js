let modal = document.getElementById("Smodal");
let lmodal = document.getElementById("Lmodal");
let scores = document.getElementById("score");
let score = 0
let life = document.getElementById("lifes");
let lifes = 5
var lose = new Audio('music/death.mp3');


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

function checkinglose() {
    if (lifes == 0){
    lmodal.style.display = 'block';
    new Audio('music/lose.mp3').play()
    };
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(this.x > 510){
        this.x = -50;
        this.speed = 300 + Math.floor(Math.random() * 222);
    }
     if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        lifes--;
        lose.play();
        life.innerHTML = lifes;
        checkinglose();
    };
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

function restart() {
    modal.style.display = 'none';
    lmodal.style.display = 'none';
     score = 0;
     lifes  = 5;
    scores.innerHTML = score;
    life.innerHTML = lifes;
    
}

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(!isChrome){
      document.querySelector('#iframeAudio').remove()
    }
  else{
    document.querySelector('#playAudio').remove() //just to make sure that it will not have 2x audio in the background 
  }

function checkwin() {
 if(score == 10) {
    modal.style.display = 'block';
    new Audio('music/win.mp3').play()
 }
}
// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {
    
    
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 200);
        new Audio('music/move.mp3').play()

        score++;
        scores.innerHTML = score;
        checkwin();
    };
};


// All enemies are placed in an array
var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [63, 147, 230];


enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

var player = new Player(202, 405);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

