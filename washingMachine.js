class WashingMachine {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.game = game;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset();
        this.animator = new Animator(ASSET_MANAGER.getAsset("./sprites/washing_machine/opening/washing_machine_sprite_sheet.png"), 0, 0, 800, 800, 20, 0.12, false, true);
        this.setOpening();

    };


    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    update() {
    };

    setWalk(){
        this.animator =  new Animator(ASSET_MANAGER.getAsset("./sprites/washing_machine/walking/washing_machine_walking_sprite_sheet.png"), 0, 0, 800, 800, 10, 0.03, false, true);
    };

    setOpening() {
        this.animator =  new Animator(ASSET_MANAGER.getAsset("./sprites/washing_machine/opening/washing_machine_sprite_sheet.png"), 0, 0, 800, 800, 20, 0.05, false, true);        
    };


};