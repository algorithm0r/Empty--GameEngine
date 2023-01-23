class Grass {
    
    constructor(poop, x, y, isSolid=false) {
        Object.assign(this, {poop, x, y, isSolid});
        this.engine = gameEngine;
        this.anima = ANIMANAGER;

        this.tiles = this.anima.getSpriteSet('TILES_grasses');
        this.x = 0; this.y = 0;
        this.horzTiles = 16; this.vertTiles = 14;
    };



    update(player) {

    };

    draw(ctx, scale) {
        this.tiles.tileSprite(ctx, 1, this.x, this.y, this.horzTiles, this.vertTiles, scale)
    };
}

class Wall {
    constructor(engine, x, y, isSolid){
        
    }
}