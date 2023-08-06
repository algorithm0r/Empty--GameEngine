class Harpoon {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/projectiles/spear.png");

        //var dist = distance(this, this.target);
        this.maxSpeed = 5;
        this.SPEED = 2;
        this.damage = 15;

        //this.game.projectile = this;
       
        this.height = this.RADIUS * 2;
        this.width = this.RADIUS * 2;

        // animation stats
        this.imagescale = .5;
        this.scale = 2;
        this.RADIUS = 17 * this.scale;
        this.frameWidth = 40;
        this.frameHeight = 34;

        this.angle = angle ;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;
        this.animation = [];
        this.facing = 0;
        this.loadanimations();
        this.updateBB();
    }

    loadanimations() {
        this.animation[0] = ASSET_MANAGER.getAsset("./assets/projectiles/spear N.png");
        this.animation[1] = ASSET_MANAGER.getAsset("./assets/projectiles/spear NE.png");
        this.animation[2] = ASSET_MANAGER.getAsset("./assets/projectiles/spear E.png");
        this.animation[3] = ASSET_MANAGER.getAsset("./assets/projectiles/spear SE.png");

        this.animation[4] = ASSET_MANAGER.getAsset("./assets/projectiles/spear S.png");
        this.animation[5] = ASSET_MANAGER.getAsset("./assets/projectiles/spear SW.png");
        this.animation[6] = ASSET_MANAGER.getAsset("./assets/projectiles/spear W.png");
        this.animation[7] = ASSET_MANAGER.getAsset("./assets/projectiles/spear NW.png");
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.TILEWIDTH*3, PARAMS.TILEHEIGHT*2);
    };
    
    update() {

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);

        this.x += this.SPEED * TICKSCALE * unitx;
        this.y += this.SPEED * TICKSCALE * unity;

        this.positionx = this.x - this.game.camera.x;
        this.positiony = this.y - this.game.camera.y;

        if (this.angle > 4.2875 && this.angle < -1.1625) {
            this.facing = 0;
        }
        if (this.angle > -1.1625 && this.angle < -.3875) {
            this.facing = 1;
        }
        if (this.angle > -.3875 && this.angle < .3875) {
            this.facing = 2;
        }
        if (this.angle > .3875 && this.angle < 1.1625) {
            this.facing = 3;
        }
        if (this.angle > 1.1625 && this.angle < 1.9375) {
            this.facing = 4;
        }
        if (this.angle > 1.9375 && this.angle < 2.7125) {
            this.facing = 5;
        }
        if (this.angle > 2.7125 && this.angle < 3.4875) {
            this.facing = 6;
        }
        if (this.angle > 3.4875 && this.angle < 4.2875) {
            this.facing = 7;
        }

        this.updateBB();

        var that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Monster1 || entity instanceof Slime) {
                if(that.BB.collide(entity.BB)) {
                    console.log("Harpoon hit enemy");
                    entity.health -= (that.damage * 2);
                    console.log(entity.health);
                    that.removeFromWorld = false;
                    if(entity.health <= 0) {
                        entity.dead = true;
                    }
                }
            }
            if(entity instanceof EnemyShip) {
                if(that.BB.collide(entity.BB)) {
                    console.log("Harpoon hit enemy");
                    entity.health -= (that.damage * .5);
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

        ctx.drawImage(this.animation[this.facing], 0, 0, this.RADIUS * 2, this.RADIUS * 2, this.positionx, this.positiony, this.RADIUS * 2, this.RADIUS * 2);
        //ctx.drawFrame(this.clockTick, ctx, this.positionx, this.positiony)
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }

 }