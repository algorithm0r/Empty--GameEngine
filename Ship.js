class Ship {
    //
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.health = 150;
        this.maxHealth = 150;
        this.damage = 15;
        this.invulnerabilityFrame = 0.8;

        this.width = 47;
        this.height = 60;
        this.game.player = this;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, this.width, this.height, 4, 0.5);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 



        this.speed = 0;
        this.lastDT = Date.now();
        this.dead = false;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();

        this.translate = { x: 17 * PARAMS.PIXELSCALER, y: 17 * PARAMS.PIXELSCALER };
        this.canvasOffset = { x: 14 * PARAMS.PIXELSCALER, y: 6 * PARAMS.PIXELSCALER };

        this.visualRadius = 50;
        this.circlex = (this.x + 45);
        this.circley = (this.y + 50);

    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {//2 states
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 54, 4, 0.5, false, true);
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5, true, true);
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5, false, true);
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5, false, true);

        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 60, 4, 0.5, false, true);
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5, true, true);
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5, false, true);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5, false, true);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 40,  PARAMS.TILEWIDTH * 3, PARAMS.TILEHEIGHT * 2);
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {//4 directions
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {//2 states
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 54, 4, 0.5);
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5);
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5);
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5);

        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, 47, 60, 4, 0.5);
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 75, 47, 40, 4, .5);
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 130, 47, 40, 4, .5);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 174, 47, 54, 4, .5);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y,  PARAMS.TILEWIDTH * 6, PARAMS.TILEHEIGHT * 7);
    };

    fire() {
        this.angleOffset = {
            x: this.width * PARAMS.PIXELSCALER * Math.cos(this.angle),
            y: this.width * PARAMS.PIXELSCALER * Math.sin(this.angle)
        };
        if (this.game.mouse != null) {

            this.source = { x: this.x - this.game.camera.x, y: this.y -this.game.camera.y};
            this.destination = { x: this.game.mouse.x, y: this.game.mouse.y };
            this.angle = Math.atan((this.destination.y - this.source.y) / (this.destination.x - this.source.x))
            this.angle = this.game.mouse.x >= this.source.x ? this.angle : this.angle + Math.PI;


           
        }
        
            this.game.addEntity(new CannonBall(this.game, this.x + 40, this.y + 50, this.angle)); //+40 +50 to center into ship
       //this.game.addEntity(new CannonBall(this.game, this.source.x + this.game.camera.x, this.source.y + this.game.camera.y, this.angle));
      
        if(game.keys['2']) {
            this.game.addEntity(new Fireball(this.game, this.x + 40, this.y + 50, this.angle));
        }
    }



    update() {

        const MOVE = 300;

        const TICK = this.game.clockTick

        if (game.keys['w'] && !game.keys['s'] && !game.keys[' ']) {
            this.facing = 3;
            this.state = 0;
            // this.velocity.y -= MOVE;
            this.y -= MOVE * TICK;
        }
        else if (game.keys['s'] && !game.keys['w'] && !game.keys[' ']) {
            this.facing = 0;
            this.state = 0;
            // this.velocity.y += MOVE;
            this.y += MOVE * TICK;
        }

        //determine horizontal
        if (game.keys['a'] && !game.keys['d'] && !game.keys[' ']) {
            this.facing = 1;
            this.state = 0;
            // this.velocity.x -= MOVE;
            this.x -= MOVE * TICK;
        }
        else if (game.keys['d'] && !game.keys['a'] && !game.keys[' ']) {
            this.facing = 2;
            this.state = 0;
            // this.velocity.x += MOVE;
            this.x += MOVE * TICK;
        }

        this.updateBB();

        //collision
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
                if(entity instanceof EnemyShip) {
                    console.log("collided with enemy");
                    if(timeCount(this.lastDT, Date.now()) >= this.invulnerabilityFrame) {
                        this.lastDT = Date.now();
                        that.health -= entity.damage;
                        console.log(that.health);
                    }
                }
                if(entity instanceof Coin) {
                    that.game.camera.gold += entity.value;
                    console.log(that.game.camera.gold);
                }
            }
        });

        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;
    };

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
           
            //Visual Radius
            ctx.beginPath();
            ctx.strokeStyle = 'Green';
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }

        if(this.dead === true) {
            this.game.camera.clearEntities();
            this.game.addEntity(new GameOver(this.game));
        }
    };
}
