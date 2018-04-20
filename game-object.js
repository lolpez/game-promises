function gameObject(obj) {
    var gameObj = {
        x: obj.x,
        y: obj.y,
        width: obj.width,
        height: obj.height,
        speedX: obj.speedX,
        speedY: obj.speedY,
        tag: obj.tag,
        render: function() {
            ctx = gameScene.context;
            ctx.fillStyle = obj.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        collidedWith: function(gameObjToBeCollided){
            return new Promise((resolve, reject) => {
                var collisionInterval = setInterval(function(){
                    if ((gameObj.x + gameObj.width) > gameObjToBeCollided.x &&
                        gameObj.x < gameObjToBeCollided.x + gameObjToBeCollided.width &&
                        (gameObj.y + gameObj.height) > gameObjToBeCollided.y &&
                        gameObj.y < gameObjToBeCollided.y + gameObjToBeCollided.height){
                            clearInterval(collisionInterval);
                            resolve(`${gameObj.tag} collided with ${gameObjToBeCollided.tag}`);
                    }
                }, 10);
            });
        }
    }
    return gameObj;
}