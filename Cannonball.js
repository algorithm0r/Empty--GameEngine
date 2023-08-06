class CannonBall {
    constructor(game, x, y, angle, damage) {
        Object.assign(this, { game, x, y, angle, damage});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/projectiles/cannonball.png");

        //var dist = distance(this, this.target);
        this.maxSpeed = 5;
        this.SPEED = 2.5;
        this.damage = damage;

        this.game.projectile = this;
       
        this.height = this.RADIUS * 2;
        this.width = this.RADIUS * 2;

        // animation stats
        this.imagescale = .5;
        this.scale = 2;
        this.RADIUS = 8.5 * this.scale;
        this.frameWidth = 17;
        this.frameHeight = 17;

        this.angle = angle ;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

        this.velocity = { x: 0, y: 0 };
        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        this.cache = [];
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/projectiles/cannonball.png"), 0, 0, 17, 17, 1, 1, 0);

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT);
    };
    
    update() {

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);

        this.x += this.SPEED * TICKSCALE * unitx;
        this.y += this.SPEED * TICKSCALE * unity;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

       
        if (this.positionx < 0 || this.positiony < 0 || this.positionx > PARAMS.CANVAS_WIDTH || this.positiony > PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
        this.damage;
        this.updateBB();
        
        var that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Monster1  || entity instanceof Slime || entity instanceof EnemyShip) {
                if(that.BB.collide(entity.BB)) {
                    entity.health -= this.damage;
                    console.log(entity.health);
                    that.removeFromWorld = true;
                    if(entity.health <= 0) {
                        entity.dead = true;
                    }
                }
            }
        })
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.RADIUS * 2, this.RADIUS * 2, this.positionx, this.positiony, this.RADIUS * 2, this.RADIUS * 2);

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }

}

class enemyCannonBall {
    constructor(game, x, y, player) {
        Object.assign(this, { game, x, y, player});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/projectiles/skull.png");

        //var dist = distance(this, this.target);
        this.maxSpeed = 3;
        this.SPEED = 1.5;
        this.damage = 5;
       
        this.height = this.RADIUS * 2;
        this.width = this.RADIUS * 2;

        // animation stats
        this.imagescale = .5;
        this.scale = 2;
        this.RADIUS = 8.5 * this.scale;
        this.frameWidth = 25;
        this.frameHeight = 18;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

        var dist = getDistance(this, this.player);
        this.velocity = { x: (this.player.x + 40 - this.x) / dist * this.maxSpeed, y: (this.player.y + 50 - this.y) / dist * this.maxSpeed };

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/projectiles/skull.png"), 0, 0, 25, 18, 2, .5);

        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.TILEWIDTH*2, PARAMS.TILEHEIGHT*2);
    };
    
    update() {

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        this.x += this.velocity.x * TICKSCALE;
        this.y += this.velocity.y * TICKSCALE;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

       
        if (this.positionx < 0 || this.positiony < 0 || this.positionx > PARAMS.CANVAS_WIDTH || this.positiony > PARAMS.CANVAS_HEIGHT) {
            this.removeFromWorld = true;
        }
        this.damage;
        this.updateBB();
        
        var that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Ship) {
                if(that.BB.collide(entity.BB)) {
                    entity.health -= this.damage;
                    console.log(entity.health);
                    that.removeFromWorld = true;
                    if(entity.health <= 0) {
                        this.game.camera.loadGameover();
                    }
                }
            }
        })
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.positionx, this.positiony);
        //ctx.drawImage(this.spritesheet, 0, 0, this.RADIUS * 2, this.RADIUS * 2, this.positionx, this.positiony, this.RADIUS * 2, this.RADIUS * 2);

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }

}