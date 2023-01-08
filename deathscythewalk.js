class Deathscythewalk {
    constructor() {
        this.animator = new Animator(ASSET_MANAGER.getAsset("./deathscythewalk.png"), 
        0, 0, 80, 114, 12, 0.2);
        // the width of the deathscyth in pixels is 80 pixels 
        // the height of the deathscyth in pixels is 114 pixels

    };

    update() {

    };

    draw(ctx){
        ctx.drawImage(ASSET_MANAGER.getAsset("./deathscythewalk.png"), 0, 0);

    };
}