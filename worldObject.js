class WorldObject {
    constructor(game, assetPath, x, y, collideable,  scale) {
        Object.assign(this, { game, assetPath, x, y, collideable,  scale });

        this.game = game;
        this.assetPath = assetPath;
        this.img = ASSET_MANAGER.getAsset(this.assetPath);
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.collideable = collideable;
        this.height = this.img.height * 2;
        this.width = this.img.width * 2;
        
        
        this.WorldObject = new Animator(this.img, 0, 0, this.img.width, this.img.height, 1, 1);

        if (collideable) {
            this.BB = new BoundingBox(this.x, this.y,this.width, this.height );
        }

    };

    update() { };

    draw(ctx) {
        this.WorldObject.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}