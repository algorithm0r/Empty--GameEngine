class Fireball {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/projectiles/fireball.png");

        //var dist = distance(this, this.target);
        this.maxSpeed = 5;
        this.SPEED = 2;
        this.damage = 10;

        //this.game.projectile = this;
       
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

        const TICKSCALE = this.game.clockTick * PARAMS.TIMESCALE;

        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/projectiles/fireball.png"), 0, 0, 17, 17, 1, 1, 0);
        //this.BoundingBox = new BoundingBox(this, 50, 50, 17, 17);

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
        this.updateBB();

        var that = this;
        this.game.entities.forEach(entity => {
            if(entity instanceof Monster1 || entity instanceof Slime) {
                if(that.BB.collide(entity.BB)) {
                    console.log("fireball hit enemy");
                    entity.health -= (that.damage * .02);
                    console.log(entity.health);
                    that.removeFromWorld = false;
                    if(entity.health <= 0) {
                        entity.dead = true;
                    }
                }
            }
            if(entity instanceof EnemyShip) {
                if(that.BB.collide(entity.BB)) {
                    console.log("fireball hit enemy");
                    entity.health -= (that.damage * 2);
                    
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