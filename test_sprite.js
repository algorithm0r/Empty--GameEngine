class Test_sprite {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/duckandslide/duckandslide.png"), 0, 0, 800, 800, 12, 0.12, false, true);


    };


    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    update() {
    };

};