class Player {
    constructor(engine, x, y) {
        Object.assign(this, {engine, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./zeldagb_spritesheet_modified.png");

        this.state = 0;     // 0:idle, 1:walking
        this.facing = 1;    // 0:north, 1:south, 2:east, 3:west
        
        this.playerSpeed = 2;
        this.velocity = {x: 0, y: 0};

        this.animations = [];
        this.setupAnimations();
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
        if (this.velocity.x != 0 || this.velocity.y != 0) this.state = 1;
        else this.state = 0;
    }

    update() {
        
        let prevFacing = this.facing
        
        if (this.engine.keys["w"])      [this.facing, this.state, this.velocity.y] = [0, 1, -this.playerSpeed];
        else if (this.engine.keys["s"]) [this.facing, this.state, this.velocity.y] = [1, 1, this.playerSpeed];
        else                            this.velocity.y = 0;
        
        if (this.engine.keys["d"])      [this.facing, this.state, this.velocity.x] = [2, 1, this.playerSpeed];
        else if (this.engine.keys["a"]) [this.facing, this.state, this.velocity.x] = [3, 1, -this.playerSpeed];
        else                            this.velocity.x = 0;

        this.updateState();
        
        // if (prevFacing != this.facing) console.log("FACING CHANGE: " + this.facing);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // console.log(`State: ${this.state}`);
    };

    draw(ctx, scale) {
        this.animations[this.state][this.facing].drawFrame(this.engine.clockTick, ctx, this.x, this.y, scale)
    };
}