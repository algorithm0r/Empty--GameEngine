class Block {
    static blockwidth = 16*4;
    constructor(sx, sy, x, y, collision = false, canfall=false) {
        this.animator = new Animator("./assets/Environmental_Blocks.png",
            /* sx */ sx, /* sy */ sy,
            /* sWidth */ 16, /* sHeight */ 16, 
            /*animation length*/ 1, /* fps */ 1, /* scale */ 4);
        Object.assign(this, {sx, sy, location: {x, y}, collision, canfall});
        this.gravitator = new Gravitator(this);
        this.updateBB();
    }
    updateBB() {
        if (this.collision) {
            //this.lastBB = this.BB;
            this.BB = new BoundingBox({
                width: Block.blockwidth,
                height: Block.blockwidth,
                location: this.location,
                color: "yellow"
            });
        }
    }
    update() {
        this.animator.location = this.location;
        this.updateBB();
        this.gravitator.nextPosition();
        // if(this.canfall) this.falling = true; // assume falling until collision
        // for(const entity of gameEngine.entities) { // collision checks
        //     if(entity == this || !entity.BB ) continue; // entity does not have collision
        //     if(entity.BB.collision(this.BB/*lastBB*/)) {
        //         this.falling = false;
        //         this.fallStartTime = null;
        //         console.log("collision detected", entity.constructor.name, this.constructor.name);
        //         if(this.location.y < entity.BB.location.y)
        //             this.location.y = entity.BB.location.y - this.BB.height;
        //         //break;
        //     }
        // }
        // if(this.falling && this.fallStartTime == null) {
        //     this.fallStartTime = new Date();
        //     this.fallInitPosition = this.location;
        // }
        // if (this.collision && this.canfall && this.falling) { // fall until collision
        //     // gravity-based constants:
        //     const t_h = 0.25;       // time to apex of "jump" in seconds.
        //     const h = 4;            // desired height of "jump"
        //     const v_0 = 0;          // initial velocity in the y axis (blocks don't jump)
        //     const g = 2 * h / (t_h ** 2); // acceleration due to gravity.
        //     // are we already falling?
        //     const t = (new Date() - this.fallStartTime) / 1000; // current air time(seconds)
        //     this.location.y = 0.5 * g * t ** 2 + v_0 * t + this.fallInitPosition.y;
        // }


        if(this.location.y > 900) {
            this.location.y = 0;
        }

   
    }
    draw() {
        this.animator.draw(gameEngine.ctx);
        if (this.collision) this.BB.draw();
    }
}
