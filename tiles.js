class Rock {
    constructor(game, x, y) {
        Object.assign(this,{game, x, y});

        this.width = 105;
        this.height = 70;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/2 Objects/Rocks/rocksprite.png");
        this.rock = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);
        this.x = 100;
        this.y = 100;

        this.BB = new BoundingBox(this.x + 20, this.y + 15, PARAMS.TILEWIDTH * 9, PARAMS.TILEHEIGHT * 7);

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
        this.rock.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}