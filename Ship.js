class Ship {
    //
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.health = 150;
        this.maxHealth = 150;
        this.damage = 15;
        this.invulnerabilityFrame = 0.8;

        this.speedLevel = 0;
        this.damageLevel = 0;
        this.healthLevel = 0;

        this.width = 47;
        this.height = 60;
        this.game.player = this;
        this.animation = new Animator(ASSET_MANAGER.getAsset("./assets/player/ship.png"), 0, 0, this.width, this.height, 4, 0.5);

        this.facing = 0;//0 = down, 1 = left, 2 = right, 3 = up
        this.state = 0;//0 = normal, 1 = fast 

        this.speed = 300;
        this.lastDT = Date.now();
        this.dead = false;

        this.fireattack = false;
        this.cannonattack = true;
        this.harpoonattack = false;
        
        //for inventory
        this.maxfireballs = 20;
        this.fireballs = 10;
        this.maxharpoons = 20;
        this.harpoons = 5;

        this.elapsedtime = 0; //adds this.number to itself to check when to shoot next
        this.number = .05; //used to upgrade firerate in shop
        this.firerate = 2;

        this.damage = 10; //used to upgrade in shop
        this.moneyupgrade = 200; //used to upgrade base weapon damage in shop

        this.updateBB();
        this.update();
        
        this.animations = [];
        this.loadAnimations();

        this.translate = { x: 17 * PARAMS.PIXELSCALER, y: 17 * PARAMS.PIXELSCALER };
        this.canvasOffset = { x: 14 * PARAMS.PIXELSCALER, y: 6 * PARAMS.PIXELSCALER };

        this.visualRadius = 100;
        
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
        this.BB = new BoundingBox(this.x + 20, this.y + 20,  PARAMS.TILEWIDTH * 3, PARAMS.TILEHEIGHT * 4);
    };

    fire() {
        if (this.fireattack) {
            this.firefire(); 
        }
        if (this.cannonattack) {
            this.firecannon(); 
            //this.cntr++;
            //console.log("cntr " + this.cntr)
        }
        if (this.harpoonattack) {
            this.fireharpoon();
        }
        
    }

    firecannon() {
        this.angleOffset = {
            x: this.width * PARAMS.PIXELSCALER * Math.cos(this.angle),
            y: this.width * PARAMS.PIXELSCALER * Math.sin(this.angle)
        };
        if (this.game.mouse != null) {

            this.source = { x: (this.x + 40) - this.game.camera.x, y: (this.y + 50) -this.game.camera.y};
            this.destination = { x: this.game.mouse.x, y: this.game.mouse.y };
            this.angle = Math.atan((this.destination.y - this.source.y) / (this.destination.x - this.source.x))
            this.angle = this.game.mouse.x >= this.source.x ? this.angle : this.angle + Math.PI;
        }
        if(this.elapsedtime > this.firerate) { 
        this.game.addEntity(new CannonBall(this.game, this.x + 40, this.y + 50, this.angle, this.damage)); //+40 +50 to center into ship
        this.elapsedtime = 0;
        }
    }

    firefire() {
        this.angleOffset = {
            x: this.width * PARAMS.PIXELSCALER * Math.cos(this.angle),
            y: this.width * PARAMS.PIXELSCALER * Math.sin(this.angle)
        };
        if (this.game.mouse != null) {

            this.source = { x: (this.x + 40) - this.game.camera.x, y: (this.y + 50) -this.game.camera.y};
            this.destination = { x: this.game.mouse.x, y: this.game.mouse.y };
            this.angle = Math.atan((this.destination.y - this.source.y) / (this.destination.x - this.source.x))
            this.angle = this.game.mouse.x >= this.source.x ? this.angle : this.angle + Math.PI;
        }
        if(this.fireballs > 0) {
            this.game.addEntity(new Fireball(this.game, this.x + 40, this.y + 50, this.angle));
            this.fireballs--;
            console.log("number of fireballs remaining = " + this.fireballs);
        }
        else if(this.fireballs == 0) {
            this.fireattack = false;
            this.harpoonattack = false;
            this.cannonattack = true;
        }
        
    }

    fireharpoon() {
        this.angleOffset = {
            x: this.width * PARAMS.PIXELSCALER * Math.cos(this.angle),
            y: this.width * PARAMS.PIXELSCALER * Math.sin(this.angle)
        };
        if (this.game.mouse != null) {

            this.source = { x: (this.x + 40) - this.game.camera.x, y: (this.y + 50) -this.game.camera.y};
            this.destination = { x: this.game.mouse.x, y: this.game.mouse.y };
            this.angle = Math.atan((this.destination.y - this.source.y) / (this.destination.x - this.source.x))
            this.angle = this.game.mouse.x >= this.source.x ? this.angle : this.angle + Math.PI;
        }

        if(this.harpoons > 0) {
            this.game.addEntity(new Harpoon(this.game, this.x + 40, this.y + 50, this.angle));
            this.harpoons--;
            console.log("number of harpoons remaining = " + this.harpoons);
        }
        else if(this.harpoons == 0) {
            this.harpoonattack = false;
            this.fireattack = false;
            this.cannonattack = true;
            this.fire();
            console.log("number of harpoons remaining = " + this.harpoons);
        }
        
    }

    update() {

        const TICK = this.game.clockTick;
        this.elapsedtime += this.number;

        if(game.keys['1'] && !game.keys['2'] && !game.keys['3'])
        {
            //do nothing
        }
        else if (!game.keys['1'] ) {
            this.fireattack = false;
            this.cannonattack = true;
            this.harpoonattack = false;
            //this.firecannon();
        }
        else if(!game.keys['2']) {
            this.fireattack = true;
            this.cannonattack = false;
            this.harpoonattack = false;
        }
        
        else if (!game.keys['3']) {
            this.fireattack = false;
            this.cannonattack = false;
            this.harpoonattack = true;
        }
        else if(this.cannonattack == true) {
            this.firecannon();
        }
        //console.log("elapsed time= " + this.elapsedtime);

        if (game.keys['w'] && !game.keys['s'] && !game.keys[' ']) {
            this.facing = 3;
            this.state = 0;
            this.fireattack;
            this.cannonattack;
            this.y -= this.speed * TICK;
        }
        else if (game.keys['s'] && !game.keys['w'] && !game.keys[' ']) {
            this.facing = 0;
            this.state = 0;
            this.fireattack;
            this.cannonattack;
            this.y += this.speed * TICK;
        }

        //determine horizontal
        if (game.keys['a'] && !game.keys['d'] && !game.keys[' ']) {
            this.facing = 1;
            this.state = 0;
            this.fireattack;
            this.cannonattack;
            this.x -= this.speed * TICK;
        }
        else if (game.keys['d'] && !game.keys['a'] && !game.keys[' ']) {
            this.facing = 2;
            this.state = 0;
            this.fireattack;
            this.cannonattack;
            this.x += this.speed * TICK;
        }
        
        this.updateBB();

        //collision
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
                
                if(entity instanceof Monster1 || entity instanceof Slime) {
                    if(timeCount(this.lastDT, Date.now()) >= this.invulnerabilityFrame) {
                        this.lastDT = Date.now();
                        that.health -= entity.damage;
                        if(that.health <= 0) {
                            this.game.camera.loadGameover();
                        }
                    }
                }
                

                if(entity instanceof Coin) {
                    //that.game.camera.gold += entity.value;
                }
            }
        });


        this.game.playerLocation.x = this.x;
        this.game.playerLocation.y = this.y;

        if(this.game.camera.gold >= 10000) {
            this.game.camera.loadVictory();
        }
    };

    draw(ctx) {
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        
        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
           
            //Visual Radius
            ctx.beginPath();
            ctx.strokeStyle = 'Green';
            ctx.arc(this.x + (PARAMS.TILEWIDTH * 3) - this.game.camera.x, this.y + (PARAMS.TILEHEIGHT * 3.5) - this.game.camera.y, this.visualRadius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    };
}
