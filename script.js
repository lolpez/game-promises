var gameScene;
var projectile;
var enemy;
var wallTop;
var deathSound;
var gameObjects;

/* Start of the game. */
function start(){
    deathSound = new Audio("roblox-death-sound-effect.mp3");
    gameScene = {
        canvas: document.getElementById("game-scene"),        
        refresh: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < gameObjects.length ; i++) {
                gameObjects[i].render();
            }
        },
        stop: function() {
            deathSound.play();
            clearInterval(this.interval);
        }
    }    
    /* Walls. */
    topWall = gameObject(
        {
            x: 0,
            y: 0,
            width: gameScene.canvas.width,
            height: 20,
            speedX: 0,
            speedY: 0,
            color: "green",
            tag: "top wall"
        }
    );
    bottomWall = gameObject(
        {
            x: 0,
            y: gameScene.canvas.height - 20,
            width: gameScene.canvas.width,
            height: 20,
            speedX: 0,
            speedY: 0,
            color: "green",
            tag: "bottom wall"
        }
    );
    /* Enemy. */
    enemy = gameObject(
        {
            x: 300,
            y: 120,
            width: 10,
            height: 80,
            speedX: 0,
            speedY: 1.1,
            color: "red",
            tag: "enemy"
        }
    );
    enemy.goTop = true;
    addEnemyTopCollider();

    /* Start of the game. */
    projectile = gameObject(
        {
            x: 0,
            y: 120,
            width: 20,
            height: 10,
            speedX: 3,
            speedY: 0,
            color: "blue",
            tag: "projectile"
        }
    );
    projectile.collidedWith(enemy).then((data) => {
        console.log(data)
        gameScene.stop();
    });
    gameObjects = [projectile, enemy, topWall, bottomWall];
    gameScene.context = gameScene.canvas.getContext("2d");
    gameScene.interval = setInterval(update, 10);
}

/* Update every 20 miliseconds. */
function update(){
    /* Projectile behaviour */
    (projectile.x + projectile.width > gameScene.canvas.width) ? projectile.x = 0 : projectile.x += projectile.speedX;

    /* Enemy behaviour */
    (enemy.goTop) ? enemy.y -= enemy.speedY : enemy.y += enemy.speedY;
    gameScene.refresh();
    
}

function addEnemyTopCollider(){
    enemy.collidedWith(topWall).then((data) => {
        console.log(data)
        enemy.goTop = false;
        addEnemyBottomCollider();
    });
}

function addEnemyBottomCollider(){
    enemy.collidedWith(bottomWall).then((data) => {
        console.log(data)
        enemy.goTop = true;
        addEnemyTopCollider();
    });
}