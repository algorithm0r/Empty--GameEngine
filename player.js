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
        this.gravity = 10; 
        this.onGround = true;
        this.jumping = false;
        this.jumpingLeft = false;
        this.jumpingRight = false;
        this.falling = false;

        //this conditional block will set the sprite for the player type
        //will expand in future iterations to set other conditions such as bounding boxes and 
        //physics properties
        if(player_type === "scribble") {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/duckandslide/duckandslide.png"), 0, 0, 200, 200, 12, 0.12, false, true);
        } else if(player_type === "default") {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/sprite_sheet.png"), 0, 0, 200, 200, 8, 0.1, false, true);
        } 
        else if(player_type = "washing_machine") {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/washing_machine/walking/washing_machine_walking_sprite_sheet.png"), 0, 0, 800, 800, 10, 0.05, false, true);
        }

    };

    update() {
        console.log('velocity.x=' + this.velocity.x);

        // Prevents the animation from falling through the window.
        if (this.y >= 1000) {
            this.onGround = true;
        }

        const TICK = this.game.clockTick;

       // A simple jump mechanic
        if (this.game.space && !this.jumping && !this.falling) {
            if (this.game.left) {
                this.jumpingLeft = true;
            }
            else if (this.game.right) {
                this.jumpingRight = true;
            }
            this.jumping = true;
            this.onGround = false;
            this.velocity.y = -500;
        }
        
        if (this.jumping) {
            if (this.jumpingLeft) {
                this.x -= this.velocity.x;
            } else if (this.jumpingRight) {
                this.x += this.velocity.x;
            }
            this.velocity.y += this.gravity;
            if (this.onGround) {
                this.jumping = false;
            }
        }
        
        if (this.onGround) {
            this.velocity.y = 0;
            this.jumpingLeft = false;
            this.jumpingRight = false;
        }
        
        // Left and right movement
        if (this.game.left && !this.jumping && !this.falling) {
            console.log('this.left is true');
            this.x -= this.velocity.x;
        }
        else if (this.game.right && !this.jumping && !this.falling) {
            console.log('this.right is true');
            this.x += this.velocity.x;
        }

        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

    };
    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    
    

};