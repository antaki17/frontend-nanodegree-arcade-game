
//Declare variables
var canvasWidth = 500;
var colWidth = 101;
var colHeight = 83;
var positionx = 1;
var enemyCount = 6;
var enemyPositions = [60, 145, 230];
var enemySpeeds = [200, 220, 240, 260, 280, 300];
var playerPositionx = 200;
var playerPositiony = 400;

//Random enemy position
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Enemy class
var Enemy = function() { 
    this.x = positionx;
    this.y = enemyPositions[getRandomInt(enemyPositions.length)];
    this.speed = enemySpeeds[Math.floor(Math.random() * enemySpeeds.length)];    
    this.sprite = 'images/enemy-bug.png';
};

//Enemy reset
Enemy.prototype.reset = function() {
    this.x = positionx;
    this.y = enemyPositions[getRandomInt(enemyPositions.length)];
    this.speed = Math.random() * 200 + 10;
};

//Update the enemy's position
Enemy.prototype.update = function(dt) {

    //Ensure that the game runs at the same speed for all computers
    this.x = this.x + (this.speed * dt);
    if (this.x > canvasWidth) {
        this.reset();
    }
    if ((Math.abs(this.x - Player.x) < 80) && (Math.abs(this.y - Player.y) < 60)) {
        Player.reset();
    }

    this.collisionsCheck(this, player);
};

//render enemy objects to screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Collision check
Enemy.prototype.collision = function(enemy, player) {
        //Enemy  perimeter  collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 75;
    this.bottom = this.y + 75;
    
    return !(player.left > enemy.right ||
        player.right < enemy.left ||
        player.top > enemy.bottom ||
        player.bottom < enemy.top);
};
Enemy.prototype.collisionsCheck = function(enemy, player) {
    if (this.collision(enemy, player)) {
        player.reset();
    }
};

//Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
    this.x = playerPositionx;
    this.y = playerPositiony;
};

//Player Update
Player.prototype.update = function(dt) {

    if (this.x >= canvasWidth) {
        this.x = (this.x - colWidth);
    }
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.y >= playerPositiony) {
        this.y = playerPositiony;
    }
    if (this.y <= 0) {
        this.reset();
    }
    //Player perimeter for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 75;
    this.bottom = this.y + 75;
};

//Render player to screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handleinput player position
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            this.x -= colWidth;
            break;
        case 'right':
            this.x += colWidth;
            break;
        case 'up':
            this.y -= colHeight;
            break;
        case 'down':
            this.y += colHeight;
            break;
        default:
            break;
    }
};

//Instantiate objects
var player = new Player();
var allEnemies = [];
for (var i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
};

//Listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

