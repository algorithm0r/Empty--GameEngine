class Coin {
    constructor(game, x, y, player) {
        Object.assign(this,{game, x, y, player});

        this.visualRadius = 100;
        this.circlex = this.x + (PARAMS.TILEWIDTH / 2);
        this.circley = this.y + (PARAMS.TILEHEIGHT / 2);
        this.velocity = {x: 0, y: 0};
        this.acceleration = 100000;

        this.attraction = new Gravitate(this.player, this.game, this);

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/items/coin.png"), 0, 3, 16, 16, 1, .5, true, true);

        this.BB = new BoundingBox(this.x + 13, this.y + 12, PARAMS.TILEWIDTH / 2, PARAMS.TILEHEIGHT / 2);
    };

    collideRadius(other) {
        return getDistance(this, other) < this.visualRadius + other.visualRadius + 8;
    };

    update() {
        let that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Ship) {
                if(that.collideRadius(entity)) {
                    console.log("coin collided with ship radius");
                    // that.attraction.gravitate();
                }

                if(that.BB.collide(entity.BB)) {
                    that.removeFromWorld = true;
                }
            }

        })
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