class EnemyShip {
    constructor(game, x, y, player) {
        Object.assign(this, {game, x, y, player});

        this.health = 50;
        this.maxHealth = 50;
        this.damage = 10;
        this.goldVal = 200;

        this.width = 70;
        this.height = 50;
        this.enemyship = new Animator(ASSET_MANAGER.getAsset("./assets/player/mobshipw.png"), 1, 1, this.width, this.height, 1, 1, false, true);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 

        this.speed = getRandomInt(50, 150);
        this.dead = false;
        this.healthbar = new Healthbar(this);

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y + 10, PARAMS.TILEWIDTH * 7, PARAMS.TILEHEIGHT * 2);
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
        this.enemyship.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
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