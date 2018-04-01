//Set score panel
let score = 0;
document.getElementById("playerScore").innerHTML = score;

// Enemies our player must avoid
var Enemy = function(posX, posY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.posX < 505) {
        this.posX += (this.speed * dt);
    } else {
        this.speed = Math.random() * 500 + 50;
        this.posX = -90
        this.posY = Math.floor(Math.random() * 3) * 85 + 60;
    }

    // if player meets the enemy
    if (this.posX < player.x + 30 && this.posX + 60 > player.x && this.posY < player.y + 60 && this.posY + 40 > player.y) {
        if (score - 50 < 0) { score = 0; } else score -= 50;
        document.getElementById("playerScore").innerHTML = score;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = "images/char-pink-girl.png";
        this.x = 200;
        this.y = 400;
    }

    // Is called every time the player position is updated
    update() {
        // If the player reaches the water
        if (player.y < 20) {
            score++;
            document.getElementById('playerScore').innerHTML = score;
            this.reset();
        }
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Handle the player movement in all directions
    handleInput(direction) {
        if (direction == "left" && this.x > 0) {
            this.x -= 50;
        }
        if (direction == "right" && this.x < 400) {
            this.x += 50;
        }
        if (direction == "up" && this.y > 3) {
            this.y -= 50;
        }
        if (direction == "down" && this.y < 400) {
            this.y += 50;
        }
    }

    // Called when the player and the enemy touch each other
    reset() {
        this.x = 200;
        this.y = 320;
    }
}

// Gem class
// create a gem and place it on game board
class Gem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.sprite = img;
    }

    // Is called every time the player position is updated
    update() {
        this.checkCollision();
    }

    checkCollision() {
        // Set hitboxes for collision detection
        var playerBox = { x: player.x, y: player.y, width: 50, height: 40 };
        var gemBox = { x: this.x, y: this.y, width: 60, height: 70 };
        // Check for collisions, if playerBox intersects gemBox, we have one
        if (playerBox.x < gemBox.x + gemBox.width &&
            playerBox.x + playerBox.width > gemBox.x &&
            playerBox.y < gemBox.y + gemBox.height &&
            playerBox.height + playerBox.y > gemBox.y) {
            // Collision detected, call collisionDetected function
            this.collisionDetected();
        }
    }

    collisionDetected() {
        this.y = 9000;
        score += this.points; //update the score when player collects a gem
        document.getElementById("playerScore").innerHTML = score;
        let gemm = this;
        setTimeout(function() {
            // Gems appear at one of the following x positions: 0, 10, 200, 300, 400
            gemm.x = (100 * Math.floor(Math.random() * 4) + 0);
            // Gems appear at one of the following Y positions: 60, 145, 230
            gemm.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
        }, this.delay);
    }

}


//Create a Blue Gem from Gem class
class BlueGem extends Gem {
    constructor(x, y) {
        super(x, y);
        this.points = 30; //blue gem has 30 points
        this.sprite = "images/Gem Blue.png";
        this.delay = 20000; //redraw the gem after some time
    }

    // Draw the Blue Gem on the scren
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

//Create a Green Gem from Gem class
class GreenGem extends Gem {
    constructor(x, y) {
        super(x, y);
        this.points = 20; //blue gem has 20 points
        this.sprite = "images/Gem Green.png";
        this.delay = 10000; //redraw the gem after some time
    }

    // Draw the Green Gem on the scren
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

//Create an Orange Gem from Gem class
class OrangeGem extends Gem {
    constructor(x, y) {
        super(x, y);
        this.points = 10; //Orange gem has 15 points
        this.sprite = "images/Gem Orange.png";
        this.delay = 5000; //redraw the gem after some time
    }

    // Draw the Green Gem on the scren
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60, 200);
var enemy2 = new Enemy(-190, 145, 200);
var enemy3 = new Enemy(-290, 230, 200);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player();

//create 3 gems
var gem1 = new BlueGem(200, 200);
var gem2 = new GreenGem(100, 100);
var gem3 = new OrangeGem(300, 100);
//Now put all gems inside allGems array
var allGems = [gem1, gem2, gem3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});