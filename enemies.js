class EnemyShip {
    constructor(game, x, y, player) {
        Object.assign(this, {game, x, y, player});

        this.health = 50;
        this.maxHealth = 50;
        this.damage = 10;
        this.goldVal = 200;

        this.width = 106;
        this.height = 80;
        this.enemyship = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster.png"), 0, 0, this.width, this.height, 4, .5);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 
        this.animations = [];
        

        this.speed = getRandomInt(30, 60);
        this.dead = false;
        this.healthbar = new Healthbar(this);

        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
        }

        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster.png"), 0, 0, 106, 80, 4, 0.5);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster.png"), 0, 115, 106, 45, 4, .5);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster.png"), 0, 210, 106, 45, 4, .5);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./assets/enemies/monster.png"), 0, 295, 106, 80, 4 , .5);
    }

    updateBB() {
        this.lastBB = this.BB;
        if ((this.facing == 0) || (this.facing == 3)) {
            this.BB = new BoundingBox(this.x + 53, this.y + 40, this.height, this.width);
        }
        else if (this.facing == 1) {
            this.BB = new BoundingBox(this.x, this.y + 13, 1.25 * this.width, this.height);
        }
        else if (this.facing == 2) {
            this.BB = new BoundingBox(this.x + 55, this.y + 13, 1.25 * this.width, this.height);
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
        console.log(this.speed);
        this.updateBB();

        if(this.x < this.game.player.x) {
            this.facing = 2
        }
        if(this.y < this.game.player.y) {
            this.facing = 0
        }
        else if(this.x > this.game.player.x) {
            this.facing = 1
        }
        else if(this.y > this.game.player.y) {
            this.facing = 3
        }
        

        //enemy collision
        var that = this;
        this.game.entities.forEach(entity => {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(entity instanceof Rock) {
                    if(that.BB.collide(entity.BB)) {
                        console.log("collided with rock");  
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