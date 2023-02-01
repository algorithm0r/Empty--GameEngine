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

        this.leftBB = new BoundingBox(this.x + 20, this.y + 15, 0, PARAMS.TILEHEIGHT * 7);
        this.rightBB = new BoundingBox(this.x + 164, this.y + 15, 0, PARAMS.TILEHEIGHT * 7);
        this.topBB = new BoundingBox(this.x + 20, this.y + 13, PARAMS.TILEWIDTH * 9, 0);
        this.bottomBB = new BoundingBox(this.x + 20, this.y + 127,PARAMS.TILEWIDTH * 9, 0);

    };

    update() {
        
    };

    draw(ctx) {
        this.rock.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.leftBB.x  - this.game.camera.x, this.leftBB.y - this.game.camera.y, this.leftBB.width, this.leftBB.height);

            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.rightBB.x  - this.game.camera.x, this.rightBB.y - this.game.camera.y, this.rightBB.width, this.rightBB.height);

            ctx.strokeStyle = 'Purple';
            ctx.strokeRect(this.topBB.x  - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);

            ctx.strokeStyle = 'Black';
            ctx.strokeRect(this.bottomBB.x  - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
        }
    }
}