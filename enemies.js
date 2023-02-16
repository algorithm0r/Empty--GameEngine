class EnemyShip {
    constructor(game, x, y, player) {
        Object.assign(this, {game, x, y, player});

        this.health = 50;
        this.maxHealth = 50;
        this.damage = 0;
        this.goldVal = 200;

        this.width = 106;
        this.height = 80;
        this.enemyship = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster1.png"), 0, 0, this.width, this.height, 4, .5);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 
        this.animations = [];
        

        this.speed = getRandomInt(10, 100);
        this.dead = false;
        this.healthbar = new Healthbar(this);

        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster1.png"), 0, 10, 112, 80, 4, 0.4);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster1.png"), 0, 115, 112, 45, 4, .3);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster1.png"), 0, 210, 112, 45, 4, .3);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster1.png"), 0, 295, 112, 80, 4 , .4);
    }

    updateBB() {
        this.lastBB = this.BB;
        if ((this.facing == 0) || (this.facing == 3)) {
            this.BB = new BoundingBox(this.x + 70, this.y + 20, this.height, this.width);
        }
        else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x + 10, this.y + 13, 1.25 * this.width, this.height);
        }
        else if (this.facing == 2) {
            this.BB = new BoundingBox(this.x + 70, this.y + 13, 1.25 * this.width, this.height);
        }
    };

    update() {
        const TICK = this.game.clockTick;

        let playerX = this.game.playerLocation.x;
        let playerY = this.game.playerLocation.y;

        let dx = this.x - playerX;
        let dy = this.y - playerY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance != 0) {
            dx /= distance;
            dy /= distance;

            this.x -= dx * this.speed * TICK;
            this.y -= dy * this.speed * TICK;
        }
        this.updateBB();

        this.diffX = Math.abs(this.x - this.game.player.x); 
        this.diffY = Math.abs(this.y - this.game.player.y); 

        this.lessX = this.x < this.game.player.x;
        this.lessY = this.y < this.game.player.y;
        this.greatX = this.x > this.game.player.x;
        this.greatY = this.y > this.game.player.y;

        if(this.lessX) { //enemy to the left of player, then face right
            this.facing = 2;
        }
        //if enemy left and above player and more up than left, face down
        if(this.lessX && this.greatY && this.diffX < this.diffY) {
            this.facing = 0;
        }
        //if enemy left and below player and more below than left, face up
        if(this.lessX && this.lessY && this.diffX < this.diffY) {
            this.facing = 3;
        }

        if(this.greatX) { //if enemy right of player, face left
            this.facing = 1;
        }
        // if enemy right and above player and more up than left, face down
        if(this.greatX && this.greatY && this.diffX < this.diffY) {
            this.facing = 0;
        }
        //if enemy right and below player and more below than left, face up
        if(this.greatX && this.lessY && this.diffX < this.diffY) {
            this.facing = 3;
        }

        if(this.lessY) { // if enemy below player, face up
            this.facing = 0;
        }
        // if enemy below and right of player and more right than below, face left
        if(this.lessY && this.greatX && this.diffX > this.diffY) {
            this.facing = 1;
        }
        // if enemy below and left of player and more left than below, face right
        if(this.lessY && this.lessX && this.diffX > this.diffY) {
            this.facing = 2;
        }

        if(this.greatY) { // if enemy above player, face down
            this.facing = 3;
        }
        // if enemy above and right of player and more right than below, face left
        if(this.greatY && this.greatX && this.diffX > this.diffY) {
            this.facing = 1;
        }
        // if enemy above and left of player and more left than below, face right
        if(this.greatY && this.lessX && this.diffX > this.diffY) {
            this.facing = 2;
        }

       
        

        //enemy collision
        var that = this;
        this.game.entities.forEach(entity => {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(entity instanceof Rock || entity instanceof WorldObject || entity instanceof Shop) {
                    if(that.BB.collide(entity.BB)) {
                         if (that.lastBB.right - PARAMS.TILEWIDTH <= entity.BB.left) { //ship right side collides with entity left
                            that.x -= that.lastBB.right - entity.BB.left;
                        } else if (that.lastBB.left + PARAMS.TILEWIDTH >= entity.BB.right) { //ship left side collides with entity right
                            that.x += entity.BB.right - that.lastBB.left;
                        } else if (that.lastBB.bottom - PARAMS.TILEHEIGHT <= entity.BB.top) { //ship bottom side collides with entity top
                            that.y -= that.lastBB.bottom - entity.BB.top;
                        } else if (that.lastBB.top + PARAMS.TILEHEIGHT >= entity.BB.bottom) { //ship top side collides with entity bottom
                            that.y += entity.BB.bottom - that.lastBB.top;
                        }
                    }
                    that.updateBB();
                }
            }
        });
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        //this.enemyship.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if(this.dead === true) {
            this.removeFromWorld = true;
            this.game.addEntity(new Coin(this.game, this.x + 50, this.y + 10, this.player, this.goldVal));
        }

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        this.healthbar.draw(ctx);
    };
}