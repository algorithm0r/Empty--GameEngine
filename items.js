class Coin {
    constructor(game, x, y, player) {
        Object.assign(this,{game, x, y, player});

        this.visualRadius = 100;
        this.circlex = this.x + (PARAMS.TILEWIDTH / 2);
        this.circley = this.y + (PARAMS.TILEHEIGHT / 2);
        this.velocity = {x: 0, y: 0};
        this.acceleration = 100000;

        this.speed = 100;

        this.attraction = new Gravitate(this.player, this.game, this);

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/items/coin.png"), 0, 3, 16, 16, 1, .5, true, true);

        this.updateBB();
    };

    collideRadius(other) {
        return getDistance(this, other) < this.visualRadius + other.visualRadius + 8;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + 13, this.y + 12, PARAMS.TILEWIDTH / 2, PARAMS.TILEHEIGHT / 2);
    };

    update() {

        const TICK = game.clockTick;

        let playerX = game.playerLocation.x;
        let playerY = game.playerLocation.y;

        let dx = this.x - playerX;
        let dy = this.y - playerY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance != 0 && this.collideRadius(this.player)) {
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
            ctx.arc(this.circlex - this.game.camera.x, this.circley - this.game.camera.y, this.visualRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    }
}