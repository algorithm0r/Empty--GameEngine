class Squid {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Characters/squid/squid_sheet.png"), 0, 0, 800, 800, 5, 0.12, false, true);
        

    };


    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    update() {
    };

    setAttack(){
        this.animator =  new Animator(ASSET_MANAGER.getAsset("./Characters/squid_ink/sqink.png"), 0, 0, 800, 800, 16, 0.1, false, true);
    };

  

};