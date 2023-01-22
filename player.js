class Player {
    static MAX_VEL = 1;
    constructor(engine, x, y) {
        Object.assign(this, {engine, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./zeldagb_spritesheet_modified.png");

        this.state = 0;     // 0:idle, 1:walking
        this.facing = 1;    // 0:north, 1:south, 2:east, 3:west

        this.animations = [];
        this.setupAnimations();

        this.phys2d = {static: false, velocity: {x: 0, y: 0}};
        this.tag = "player";

    };

    setupAnimations() {
        for (let i = 0; i < 2; i++) {           // states
            this.animations.push([]);          
            for (let j = 0; j < 4; j++) {       // directions
                this.animations[i].push([]);    
            }
        }

        // idle animations
        // facing north
        this.animations[0][0] = new Animator(this.spritesheet, 1, 1, 16, 16, 1, 1);
        // facing south
        this.animations[0][1] = new Animator(this.spritesheet, 35, 1, 16, 16, 1, 1);
        // facing east
        this.animations[0][2] = new Animator(this.spritesheet, 69, 1, 16, 16, 1, 1);
        // facing west
        this.animations[0][3] = new Animator(this.spritesheet, 103, 1, 16, 16, 1, 1);

        //walking animations
        //facing north
        this.animations[1][0] = new Animator(this.spritesheet, 1, 1, 16, 16, 2, 0.2);
        // facing south
        this.animations[1][1] = new Animator(this.spritesheet, 35, 1, 16, 16, 2, 0.2);
        // facing east
        this.animations[1][2] = new Animator(this.spritesheet, 69, 1, 16, 16, 2, 0.2);
        // facing west
        this.animations[1][3] = new Animator(this.spritesheet, 103, 1, 16, 16, 2, 0.2);
    };

    updateState() {
        if (this.phys2d.velocity.x != 0 || this.phys2d.velocity.y != 0) this.state = 1;
        else this.state = 0;
    }

    update() {
        let prevFacing = this.facing
        
        if (this.engine.keys["w"])      [this.facing, this.state, this.phys2d.velocity.y] = [0, 1, -Player.MAX_VEL];
        else if (this.engine.keys["s"]) [this.facing, this.state, this.phys2d.velocity.y] = [1, 1, Player.MAX_VEL];
        else                            this.phys2d.velocity.y = 0;
        
        if (this.engine.keys["d"])      [this.facing, this.state, this.phys2d.velocity.x] = [2, 1, Player.MAX_VEL];
        else if (this.engine.keys["a"]) [this.facing, this.state, this.phys2d.velocity.x] = [3, 1, -Player.MAX_VEL];
        else                            this.phys2d.velocity.x = 0;

        this.phys2d.velocity = normalizeVector(this.phys2d.velocity);

        this.updateState();
        

        let prevX = this.x;
        let prevY = this.y;

        this.x += this.phys2d.velocity.x;
        this.y += this.phys2d.velocity.y;
        this.updateCollider();
        this.collisionChecker(prevX, prevY);
    };

    /**
     * Called once per tick after adjusting player position
     * @param {*} prevX x value before velocity was applied
     * @param {*} prevY y value before velocity was applied
     */
    collisionChecker(prevX, prevY) {
        this.colliding = false;
        this.engine.entities.forEach(entity => {
            if(entity.collider != undefined && entity.collider.type === "box" && entity != this){
                //Check to see if player is colliding with entity
                let colliding = checkCollision(this, entity);
                this.colliding = colliding;//store for later purposes
                //check to see if the collision entity is solid and the type of entity we are looking for
                if(colliding && entity.phys2d && entity.phys2d.static && entity.tag == "environment"){
                    dynmStaticColHandler(this, entity, prevX, prevY);//Handle collision
                }
            }
        });
    }

    updateCollider(){
        this.collider = {type: "box", corner: {x: this.x, y: this.y}, width: 64, height: 64};
    }

    drawCollider(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.sidesAffected.down ? "green" : "red";
        ctx.lineTo(this.x + this.collider.width, this.y);
        ctx.stroke();
        ctx.closePath();
        
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.collider.width, this.y);
        ctx.strokeStyle = this.sidesAffected.left ? "green" : "red";
        ctx.lineTo(this.x + this.collider.width, this.y + this.collider.height);
        ctx.stroke();
        ctx.closePath();

        
        ctx.beginPath();
        ctx.moveTo(this.x + this.collider.width, this.y + this.collider.height);
        ctx.strokeStyle = this.sidesAffected.up ? "green" : "red";
        ctx.lineTo(this.x, this.y + this.collider.height);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.collider.height);
        ctx.strokeStyle = this.sidesAffected.right ? "green" : "red";
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    draw(ctx, scale) {
        this.animations[this.state][this.facing].drawFrame(this.engine.clockTick, ctx, this.x, this.y, scale);
        if(this.colliding) this.drawCollider(ctx);
    };
}