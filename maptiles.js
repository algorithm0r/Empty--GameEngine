class Grass {
    constructor(xLoc, yLoc) {
        Object.assign(this, {xLoc, yLoc});

        this.tiles = ANIMANAGER.getSpriteSet('env_grasses');
        this.tag = 'environment';        
    };

    update() {

    };

    draw(ctx, scale) {
        this.tiles.drawSprite(ctx, 0, this.xLoc, this.yLoc, scale);
    };
}

class Stone {
    constructor(xLoc, yLoc) {
        Object.assign(this, {xLoc, yLoc});

        this.tiles = ANIMANAGER.getSpriteSet('env_stones');
        this.phsy2d = {static: true};
        this.collider = {type: "box", corner: {x: xLoc, y: yLoc}, height: 16, width: 16};
        this.tag = 'environment';
    };

    update() {
        
    };

    draw(ctx, scale) {
        this.tiles.drawSprite(ctx, 0, this.xLoc, this.yLoc, scale);
    }
}

class Sand {
    constructor(xLoc, yLoc) {
        Object.assign(this, {xLoc, yLoc});

        this.tiles = ANIMANAGER.getSpriteSet('env_sands');
        this.tag = 'environment';
    };

    update() {
        
    };

    draw(ctx, scale) {
        this.tiles.drawSprite(ctx, 0, this.xLoc, this.yLoc, scale);
    };
}