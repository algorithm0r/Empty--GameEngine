//main player object

//PARAMS:
//game is the game engine that the player will be placed into
//player is a string representing the player type
//x and y are positional coordinates in pixels, can be used for various purposes.
class Player {

    constructor(game, player_type, x, y) {
        Object.assign(this, { game, player_type, x, y });

        //assign the game engine to this object
        this.game = game;

        // update x and y position
        this.x = 100;
        this.y = 400;
        this.velocity = { x: 6, y: 0 };
        this.gravity = 28;
        this.onGround = true;
        this.jumping = false;
        this.jumpingLeft = false;
        this.jumpingRight = false;
        this.falling = false;
        this.player_type = player_type;

        // Player animation states: 0=idle. 1=moving left/right. 2=duck_slide. 3=jump.
        this.state = 0;
        // Player facing: 0=right. 1=left.
        this.facing = 0;
        // a 2D array to store all the player's states.
        this.animations = [
            [0,0],
            [0,1],
            [1,0],
            [1,1],
            [2,0],
            [2,1],
            [3,0],
            [3,1]
        ];

        this.loadAnimations();

        // Assign spritesheets to values for use.
        this.jumpAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/jump/jump_sprite_sheet_200.png"), 0, 0, 200, 200, 12, 0.12, false, true);
        this.defaultAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/storm/sprite_sheet.png"), 0, 200, 200, 200, 8, 0.1, false, true);
        this.washing_machineAnimation = new Animator(ASSET_MANAGER.getAsset("./assets/characters/washing_machine/washing_machine/walking/washing_machine_walking_sprite_sheet.png"), 0, 0, 800, 800, 10, 0.05, false, true);
        this.animation = this.defaultAnimation;
    };

    /** Assigns the correct animation states to each movement. (update with new spritesheets as needed) */
    loadAnimations() {
        if (this.player_type === "default") {
            this.animation = this.defaultAnimation;
            this.animations[0][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[0][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[1][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[1][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[2][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[2][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[3][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[3][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
        }
        else if (this.player_type === "jumping") {
            this.animation = this.jumpAnimation;
            this.animations[0][0] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[0][1] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[1][0] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[1][1] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[2][0] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[2][1] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[3][0] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
            this.animations[3][1] = new Animator(this.animation, 0, 0, 200, 200, 12, 0.1, false, true);
        }
        if (this.player_type === "washing_machine") {
            this.animation = washing_machineAnimation;
            this.animations[0][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[0][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[1][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[1][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[2][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[2][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[3][0] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
            this.animations[3][1] = new Animator(this.animation, 0, 0, 200, 200, 8, 0.1, false, true);
        }
    }

    /** Updates state frame by frame */
    update() {


        // Prevents the animation from falling through the window.
        if (this.y >= 812) {
            this.onGround = true;
        }

        const TICK = this.game.clockTick;

       /** JUMP MECHANIC **/
       // Prevent changing trajectory in the air
        if (this.game.space && !this.jumping && !this.falling) {
            this.updatePlayerType("jumping");
            if (this.game.left) {
                this.facing = 1;
                this.jumpingLeft = true;
            }
            else if (this.game.right) {
                this.facing = 0;
                this.jumpingRight = true;
            }

            this.jumping = true;
            this.onGround = false;

            // decrease velocity to increase initial jump power.
            this.velocity.y = -1000;
        }

        // The jump & fall action
        if (this.jumping) {
            this.updatePlayerType("jumping");
            if (this.jumpingLeft) {
                this.x -= this.velocity.x;
            } else if (this.jumpingRight) {
                this.x += this.velocity.x;
            }
            // Edit this.gravity to change gravitational force.
            // ** NOTE: potentially make gravity a constant rather than a field,
            // ** also consider moving gravity to scene manager once implemented
            this.velocity.y += this.gravity;
            if (this.onGround) {
                this.jumping = false;
            }
        }

        // Stops the jump once player hits the ground.
        if (this.onGround) {
            this.updatePlayerType("default");
            this.velocity.y = 0;
            this.jumpingLeft = false;
            this.jumpingRight = false;
        }

        // Left and right movement
        if (this.game.left && !this.jumping && !this.falling) {
            this.facing = 1;
            this.x -= this.velocity.x;
        }
        else if (this.game.right && !this.jumping && !this.falling) {
            this.facing = 0;
            this.x += this.velocity.x;
        }

        /** UNIVERSAL POSITION UPDATE **/
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

    };

    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x-100, this.y, 1);
    };

    /** Helper method to update the player type */
    updatePlayerType(player_type) {
        if (this.player_type != player_type) {
            console.log('updatePlayerType');
            this.player_type = player_type;
            this.loadAnimations();
        }
    }


};
