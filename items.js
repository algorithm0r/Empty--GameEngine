class Coin {
    constructor(game, x, y, player, value) {
        Object.assign(this,{game, x, y, player, value});

        this.visualRadius = 100;
        this.velocity = {x: 0, y: 0};
        this.acceleration = 100000;

        this.speed = 100;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/items/coin.png"), 0, 3, 16, 16, 1, .5, true, true);

        this.updateBB();
    };

    collideRadius(other) {
        return getDistance(this, other) < this.visualRadius + other.visualRadius + 8;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + PARAMS.TILEWIDTH/2, this.y + PARAMS.TILEHEIGHT/2, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT);
    };

    update() {

        const TICK = this.game.clockTick;

        let playerX = this.game.playerLocation.x + (PARAMS.TILEWIDTH * 3);
        let playerY = this.game.playerLocation.y + (PARAMS.TILEHEIGHT * 3.5);

        let dx = (this.x + 20) - playerX;
        let dy = (this.y + 20) - playerY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(this.collideRadius(this.player)) {
            dx /= distance;
            dy /= distance;

            this.x -= dx * this.speed * TICK;
            this.y -= dy * this.speed * TICK;
        }

        this.updateBB();

        //collision
        let that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Ship) {
                if(that.BB.collide(entity.BB)) {
                    that.removeFromWorld = true;
                    that.game.camera.gold += this.value;
                }
            }
        });
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        
        if(PARAMS.DEBUG) {
            //Bounding Box
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            
            //Visual Radius
            ctx.beginPath();
            ctx.strokeStyle = 'Green';
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    }
}