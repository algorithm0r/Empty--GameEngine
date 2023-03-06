class GameOver {
    constructor(game) {
        Object.assign(this, {game});
        this.game = game;
        this.gold = this.game.camera.gold;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/piratedeathscreen.png");
        this.gameover = new Animator(this.spritesheet, 0, 0, 1920, 1080, 1, 1);
    };

    update() {
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500) && this.game.click) {
                this.game.camera.loadTitle();
            }
        }
    };

    draw(ctx) {
        this.drawGameover(ctx);
    }

    drawGameover(ctx) {
        this.gameover.drawSmallFrame(this.game.clockTick, ctx, 0, 0, PARAMS.SCALE);

        ctx.fillStyle = "WHITE";
        ctx.font = '60px Pirate';
        ctx.fillText("Gameover: You collected " + this.gold + " gold", 200, 200);

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Play Again?", 200, 400);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Play Again?", 200, 400);
        }
    }
}

class Victory {
    constructor(game) {
        Object.assign(this, {game});
        this.game = game;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/victoryscreen.png");
        this.victory = new Animator(this.spritesheet, 0, 0, 1920, 1080, 1, 1);
    };

    update() {
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 1200 && this.game.mouse.x <= 1500) && (this.game.mouse.y >= 350 && this.game.mouse.y <= 400) && this.game.click) {
                this.game.camera.loadTitle();
            }
        }
    };
    drawWin(ctx) {
        this.victory.drawSmallFrame(this.game.clockTick, ctx, 0, 0, PARAMS.SCALE);

        ctx.fillStyle = "WHITE";
        ctx.font = '60px Pirate';
        ctx.fillText("You escape with the gold", 1100, 200);

        if(this.game.mouse && (this.game.mouse.x >= 1200 && this.game.mouse.x <= 1500) && (this.game.mouse.y >= 350 && this.game.mouse.y <= 400)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Play Again?", 1200, 400);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Play Again?", 1200, 400);
        }
    }

    draw(ctx) {
        this.drawWin(ctx);
    };
}

class Title {
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/pirategametitle.png");
        this.title = new Animator(this.spritesheet, 0, 0, 1920, 1080, 1, 1);
    };

    update() {
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 340) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800) && this.game.click) {
                this.game.camera.loadMap();
            }
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 320) && (this.game.mouse.y >= 850 && this.game.mouse.y <= 900) && this.game.click) {
                this.game.camera.loadHelper();
            }
        }
    };

    draw(ctx) {
        this.drawTitle(ctx);
    };

    drawTitle(ctx) {
        this.title.drawSmallFrame(this.game.clockTick, ctx, 0, 0, PARAMS.SCALE);

        ctx.fillStyle = "WHITE";
        ctx.font = '60px Pirate';
        ctx.fillText("Pirate Game", 200, 200);

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 340) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Start", 200, 800);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Start", 200, 800);
        }

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 320) && (this.game.mouse.y >= 850 && this.game.mouse.y <= 900)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Help", 200, 900);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Help", 200, 900);
        }
    };
};

class Helper {
    constructor(game) {
        Object.assign(this, {game});

    };

    update() {
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 1600 && this.game.mouse.x <= 1780) && (this.game.mouse.y >= 950 && this.game.mouse.y <= 1010) && this.game.click) {
                this.game.camera.loadTitle();
            }
        }
    };

    draw(ctx) {
        this.drawHelper(ctx);
    };

    drawHelper(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, 1920, 1080);

        ctx.fillStyle = "BISQUE";
        ctx.font = '60px Pirate';
        ctx.fillText("INSTRUCTIONS", 100, 100);

        ctx.beginPath();
        ctx.fillStyle = "BISQUE";
        ctx.font = '45px Pirate';
        ctx.fillText("- W, A, S, D to move", 150, 200);
        ctx.fillText("- Press 1-3 for Cannonball, Fireball, Harpoon", 150, 300);
        ctx.fillText("- Press E next to Kames House to open the shop", 150, 400);
        ctx.fillText("- Fireballs pierce Slimes and Monsters but are ineffective, burns Enemy Ships", 150, 500);
        ctx.fillText("- Harpoons do heavy damage and pierce Slimes and Monster, break against Enemy Ships", 150, 700);
        ctx.fillText("- Collect 10,000 dubloons to win", 150, 600);

        ctx.closePath();

        if(this.game.mouse && (this.game.mouse.x >= 1600 && this.game.mouse.x <= 1780) && (this.game.mouse.y >= 950 && this.game.mouse.y <= 1010)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Return", 1600, 1000);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Return", 1600, 1000);
        }
    }
}