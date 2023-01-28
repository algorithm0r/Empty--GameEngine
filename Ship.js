class Ship {
    //
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 60, 4, 0.5);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 

        this.x = 0;
        this.y = 0;
        this.speed = 0;

        this.updateBB();

        this.velocity = {x: 0, y: 0};
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {//2 states
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 54, 4, 0.5);
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5);
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5);
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5);

        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 60, 4, 0.5);
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5);
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 20,  PARAMS.TILEWIDTH * 4, PARAMS.TILEHEIGHT * 4);
    };

    update() {

        const MOVE = 1;

        const TICK = this.game.clockTick

        if (game.keys['w'] && !game.keys['s'] && !game.keys[' ']) {
            this.facing = 3;
            this.state = 0;
            this.velocity.y -= MOVE;
            // this.y -= 2;
        }
        else if (game.keys['s'] && !game.keys['w'] && !game.keys[' ']) {
            this.facing = 0;
            this.state = 0;
            this.velocity.y += MOVE;
            // this.y += 2;
        }

        //determine horizontal
        if (game.keys['a'] && !game.keys['d'] && !game.keys[' ']) {
            this.facing = 1;
            this.state = 0;
            this.velocity.x -= MOVE;
            // this.x -= 2;
        }
        else if (game.keys['d'] && !game.keys['a'] && !game.keys[' ']) {
            this.facing = 2;
            this.state = 0;
            this.velocity.x += MOVE;
            // this.x += 2;
        }
        // if (this.x > 1022) this.x = -40;
        // if (this.x < -40) this.x = 1022;
        // if (this.y > 1022) this.y = -40;
        // if (this.y < -40) this.y = 1022;

        //velocity
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();

        //collision
        var that = this;
        this.game.entities.forEach(entity => {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(entity instanceof Rock) {
                    if(that.BB.collide(entity.BB)) {
                        if(that.velocity.x > 0) that.velocity.x = 0;
                        if(that.velocity.y > 0) that.velocity.y = 0;
                        if(that.velocity.x < 0) that.velocity.x = 0;
                        if(that.velocity.y < 0) that.velocity.y = 0;
                    }
                    that.updateBB();
                }
            }
        });
    };

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}
