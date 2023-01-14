class Grass {
    
    constructor(engine, x, y, isSolid=false) {
        Object.assign(this, {engine, x, y, isSolid});
        this.spritesheet = ASSET_MANAGER.getAsset("./zeldagb_spritesheet_modified.png");
        this.animator = new Animator(this.spritesheet, 1, 137, 16, 16, 1, 1);
    };

    update(player) {

    };

    draw(ctx, scale) {
        this.animator.drawFrame(this.engine.clockTick, ctx, this.x, this.y, scale);
    };
}

class Wall {
    constructor(engine, x, y, isSolid){
        
    }
}