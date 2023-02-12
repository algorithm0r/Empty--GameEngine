class CannonBall {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/projectiles/cannonball.png");

        //var dist = distance(this, this.target);
        this.maxSpeed = 5;
        this.SPEED = 2.5;
        this.damage = 15;

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

     /*   const cannonAim = function cannonAim(thisEntity, game){
            var playerX = game.player.x;
            var playerY = game.player.y;
            
            var dx = thisEntity.x - playerX;
            var dy = thisEntity.y - playerY;
        
            var distance = Math.sqrt(dx * dx + dy * dy);
            var step = thisEntity.speed/1000;
            
            dx /= distance;
            dy /= distance;

            return {dx: dx, dy:dy}
        
        } 
        var normalCannonDirection = cannonAim(this, game);
        var dx = normalCannonDirection.dx;
        var dy = normalCannonDirection.dy; */

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
            if(entity instanceof EnemyShip) {
                if(that.BB.collide(entity.BB)) {
                    console.log("cannonball hit enemy");
                    entity.health -= that.damage;
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

        //this.animation.drawFrame(this.game.clockTick, ctx, this.positionx, this.positiony);
        //ctx.drawImage(this.spritesheet, this.x + this.width, this.y + this.height, this.width, this.height, this.positionx, this.positiony, 
            //this.width * this.imagescale, this.height * this.imagescale);

        //works
        ctx.drawImage(this.spritesheet, 0, 0, this.RADIUS * 2, this.RADIUS * 2, this.positionx, this.positiony, this.RADIUS * 2, this.RADIUS * 2);

        //kinda works 
        //ctx.drawImage(this.spritesheet, this.positionx - this.RADIUS, this.positiony - this.RADIUS, this.RADIUS * 1, this.RADIUS * 1);
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }

 }