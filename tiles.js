class Rock {
    constructor(game, x, y) {
        Object.assign(this,{game, x, y});

        this.width = 105;
        this.height = 70;
        this.spritesheet = ASSET_MANAGER.getAsset("./img/rocksprite.png");
        this.rock = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);
        this.x = 0;
        this.y = 0;

        this.BB = new BoundingBox(this.x, this.y, PARAMS.TILEWIDTH * 12, PARAMS.TILEHEIGHT * 9);

        // this.game.Rock = this;

        // this.rocks = [];
        // this.loadRock();
    };

    // loadRock() {
    //     for(var i = 0; i < 1; i++) {
    //         this.rocks.push([]);
    //     }

    //     this.rocks[0] = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);
    // };

    update() {
        
    };

    draw(ctx) {
        this.rock.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    }
}