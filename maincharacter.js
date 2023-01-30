class MainCharacter extends Animator {
    modeIndex = 0; // current spriteIndex for the sprite frame in the modeSequence
    modeSequences = {
        // mode and the frame sequences necessary
        "WALK": [0, 1, 2, 3],
        "JUMP": [4, 5, 6, 7],
        "HIT": [8, 9, 8],
        "SLASH": [10, 11, 12],
        "PUNCH": [11, 13, 11],
        "RUN": [14, 15, 14, 17]
    };

    constructor({ row = 0, mode = "RUN", fps = 5, scale = 1, location = { x: 0, y: 0 } }) {
        super("assets/characters.png", 5, (32 * row), 32, 32, 4, fps, scale);
        Object.assign(this, { location, mode, row });
        console.log(this, this.location);
        this.updateBB();
        this.collision = true;
        this.canfall = true;
		//this.v_0 = 0;
        this.gravitator = new Gravitator(this);
    }

    nextSpriteIndex() {
        const seq = this.modeSequences[this.mode];
        this.modeIndex = (this.modeIndex + 1) % seq.length;
        return seq[this.modeIndex];
    }

	updateBB() {
        if (this.collision) {
            this.lastBB =
            this.BB = new BoundingBox({
                width: this.width,
                height: this.height,
                location: this.location,
                color: "green"
            });
        }
    }
    update() {
		this.updateBB();
        this.gravitator.nextPosition();
		// collision checks
		// this.wasFalling = this.falling;
        // if(this.canfall) this.falling = true; // assume falling until collision

        // for(const entity of gameEngine.entities) { 
        //     if(entity == this || entity.BB == undefined) continue; // entity does not have collision
        //     if(this.lastBB.collision(entity.BB)) {
        //         this.falling = false; // landed, clean up fall mechanics
        //         this.fallStartTime = this.fallInitPosition = null;
		// 		this.v_0 = 0;
		// 		console.log("entity?" + entity.BB.location.y, entity.BB)
        //         if(this.location.y < entity.BB.location.y)
		// 		    this.location.y = entity.BB.y - this.height - 2;
                
		// 		this.updateBB();
        //         console.log("collision detected", entity.constructor.name);
        //         //break;
        //     }
        // }
        // if(this.falling && this.fallStartTime == null) {
        //     this.fallStartTime = new Date();
        //     this.fallInitPosition = this.location;
        // }
		// // gravity-based constants:
		// const t_h = 0.25;       // time to apex of "jump" in seconds.
		// const h = 4;            // desired height of "jump"
		// const g = 2 * h / (t_h ** 2); // acceleration due to gravity.
		
        // if (this.collision && this.canfall && this.falling) { // fall until collision
        //     // are we already falling?
        //     const t = (new Date() - this.fallStartTime) / 1000; // current air time(seconds)
        //     this.location.y = 0.5 * g * t ** 2 + this.v_0 * t + this.fallInitPosition.y;
        // }
        if (gameEngine.keys["d"]) { // moving right
            this.location.x += 2;
            this.mirrored = false;
        }
        if (gameEngine.keys["a"]) { // moving left
            this.location.x -= 2;
            this.mirrored = true;
        }
        if (gameEngine.keys[" "]) { // initiate jump!
            if (this.jumpStart === undefined && this.jumpInitPosition === undefined) {
                this.mode = "JUMP";
                this.modeIndex = 0;
                // this.jumpStart = new Date();
                // this.jumpInitPosition = this.location;
				// this.v_0 = -2*h/t_h;
                this.gravitator.jump();
            }
        }
        /*if (this.location.y > 600) { // bottom of map @ ctx size y=768
            this.jumpInitPosition = this.jumpStart = undefined;
        	
            this.location.y = 600;
            this.mode = "RUN";
            this.modeIndex = 0;
        }*/

        super.update();
    }
    draw() {
        super.draw(gameEngine.ctx);
        this.BB.draw();
    }
}