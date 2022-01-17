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
        
        //this conditional block will set the sprite for the player type
        //will expand in future iterations to set other conditions such as bounding boxes and 
        //physics properties
        if(player_type === "scribble") {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/duckandslide/duckandslide.png"), 0, 0, 800, 800, 12, 0.12, false, true);
        } else if(player_type = "washing_machine") {
            this.animation = new Animator(ASSET_MANAGER.getAsset("./sprites/washing_machine/walking/washing_machine_walking_sprite_sheet.png"), 0, 0, 800, 800, 10, 0.05, false, true);
        }

    };

    //draw method will render this entity to the canvas
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    
    update() {
    };

};