class Rock {
    constructor(game, x, y) {
        Object.assign(this,{game, x, y});

        this.width = 105;
        this.height = 70;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/2 Objects/Rocks/rocksprite.png");
        this.rock = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);

        this.BB = new BoundingBox(this.x + 20, this.y + 15, PARAMS.TILEWIDTH * 9, PARAMS.TILEHEIGHT * 7);
    };

    update() {
        
    };

    draw(ctx) {
        this.rock.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Fires {
    constructor(game, x, y) {
        Object.assign(this,{game, x, y});

        this.width = 17.5;
        this.height = 20;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/2 Objects/Other/fired.png");
        this.fire = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, .1);

       };

    update() {
        if (this.resettime === undefined) {
            this.resettime = 0;
        } else {
            this.resettime += this.game.clockTick;
        }
        //if(this.game.player.burntime > 0) {
        if(this.resettime >= 2) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        this.fire.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}