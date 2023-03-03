class Hud {
    constructor(game, player) {
        Object.assign(this, {game, player});
        this.damagesprite = ASSET_MANAGER.getAsset("./assets/projectiles/cannonball.png");
        this.fireballsprite = ASSET_MANAGER.getAsset("./assets/projectiles/fireball.png");
        this.harpoonsprite = ASSET_MANAGER.getAsset("./assets/projectiles/spear.png");

        this.cannonart = new Animator(this.damagesprite, 0, 0, 17, 17, 1, 1);
        this.fireballart = new Animator(this.fireballsprite, 0, 0, 17, 17, 1, 1);
        this.harpoonart = new Animator(this.harpoonsprite, 0, 0, 40, 34, 1, 1);

        this.cannonbox = false;
        this.firebox = false;
        this.harpoonbox = false;
    };

    update() {

    };

    draw(ctx) {
        ctx.lineWidth = 2;
        ctx.font = '50px Pirate';
        ctx.fillStyle = "White";
        ctx.fillText("Gold: " + this.game.camera.gold, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 6);
        ctx.fillText("Time: " + this.game.camera.time, PARAMS.TILEWIDTH * 105, PARAMS.TILEHEIGHT * 3)
        ctx.fillText("HP: " + this.player.health, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 3);
        ctx.fillText("Gold Hoarded: ", PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 67)
        if(this.player.health > 0) {
            let ratio = this.player.health / this.player.maxHealth;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.3 ? "Red" : ratio < 0.6 ? "Yellow" : "Green";
            ctx.fillRect((this.player.x - this.game.camera.x) / 5, (this.player.y - this.game.camera.y) / 20, this.player.width * ratio * 5, PARAMS.TILEHEIGHT);
            ctx.strokeRect((this.player.x - this.game.camera.x) / 5, (this.player.y - this.game.camera.y) / 20, this.player.width * 5, PARAMS.TILEHEIGHT);
            ctx.closePath()
        }

        if(this.game.camera.gold >= 0) {
            let ratio = this.game.camera.gold / 10000;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = "Green";
            ctx.fillRect((this.player.x - this.game.camera.x) / 2.5, (this.player.y - this.game.camera.y) * 2.07, this.player.width * ratio * 10, PARAMS.TILEHEIGHT);
            ctx.strokeRect((this.player.x - this.game.camera.x) / 2.5, (this.player.y - this.game.camera.y) * 2.07, this.player.width * 10, PARAMS.TILEHEIGHT);
        }

        //box 1
        if(this.game.keys['1']) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 240, 1000, 75, 75);
            ctx.closePath();
        } else {
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 240, 1000, 75, 75);
        }

        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.4;
        ctx.fillRect(PARAMS.CANVAS_WIDTH - 240, 1000, 75, 75);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.font = "20px '";
        ctx.fillText("∞", PARAMS.CANVAS_WIDTH - 185, 1070)
        this.cannonart.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH - 220, 1020, PARAMS.SCALE);



        //box 2
        if(this.game.keys['2']) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(PARAMS.CANVASWIDTH - 160, 1000, 75, 75);
            ctx.closePath();
        } else {
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 160, 1000, 75, 75);
        }

        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.4;
        ctx.fillRect(PARAMS.CANVAS_WIDTH - 160, 1000, 75, 75);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.font = "20px Pirate";
        ctx.fillText(this.game.player.fireballs, PARAMS.CANVAS_WIDTH - 105, 1070);

        this.fireballart.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH - 140, 1020, PARAMS.SCALE);


        //box 3
        if(this.game.keys['3']) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 80, 1000, 75, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 80, 1000, 75, 75);
        }

        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.4;
        ctx.fillRect(PARAMS.CANVAS_WIDTH - 80, 1000, 75, 75);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";

        ctx.font = "20px Pirate";
        ctx.fillText(this.game.player.harpoons, PARAMS.CANVAS_WIDTH - 25, 1070);

        this.harpoonart.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH - 80, 1000, PARAMS.SCALE);

    };
};