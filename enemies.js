class EnemyShip {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.health = 50;
        this.maxHealth = 50;
        this.damage = 10;

        this.width = 70;
        this.height = 50;
        this.enemyship = new Animator(ASSET_MANAGER.getAsset("./assets/player/mobshipw.png"), 1, 1, this.width, this.height, 1, 1, false, true);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 

        this.speed = 0;
        this.dead = false;
        this.healthbar = new Healthbar(this);

        this.BB = new BoundingBox(this.x + 10, this.y + 10, PARAMS.TILEWIDTH * 7, PARAMS.TILEHEIGHT * 2);
    };

    update() {

    };

    draw(ctx) {
        this.enemyship.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if(this.dead === true) {
            this.removeFromWorld = true;
            this.game.addEntity(new Coin(this.game, this.x + 50, this.y + 10));
        }

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        this.healthbar.draw(ctx);
    };
}

class Slime {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.health = 20;
        this.maxHealth = 20;
        this.damage = 5;

        this.width = 30;
        this.height = 30;
        this.x = -300;
        this.y = -350;
        this.speed = 0;

        this.facing = 0;
        this.state = 0;
        this.dead = false;
        
        this.slime = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/slime.png"), -3, 6, 30, 30, 9, 0.2, false, true);
        
        this.animations = [];
        this.loadAnimations();

        this.game.Slime = this;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT);
    
    };

    loadAnimations() {

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/slime.png"), 6, 36, 14, 18, 9, 0.2, false, true);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/slime.png"), 215, 22, 14, 18, 9, 0.2, true, true);
    };

    update() {

    };

    draw(ctx) {
        // this.slime.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}