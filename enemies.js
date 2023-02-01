class EnemyShip {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.health = 50;
        this.damage = 10;

        this.width = 70;
        this.height = 50;
        this.enemyship = new Animator(ASSET_MANAGER.getAsset("./assets/player/mobshipw.png"), 1, 1, this.width, this.height, 1, 1);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 

        this.x = -200;
        this.y = -250;

        this.speed = 0;
        this.dead = false;

        this.BB = new BoundingBox(this.x + 10, this.y + 10, PARAMS.TILEWIDTH * 7, PARAMS.TILEHEIGHT * 2);
    };

    update() {

    };

    draw(ctx) {
        this.enemyship.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if(this.dead === true) {
            this.removeFromWorld = true;
        }

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}