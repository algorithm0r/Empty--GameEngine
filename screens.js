class GameOver {
    constructor(game) {
        Object.assign(this, {game});
        this.game = game;

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
        ctx.font = '60px""';
        ctx.fillText("Gameover", 200, 200);

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px""';
            ctx.fillText("Play Again?", 200, 400);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px""';
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
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500) && this.game.click) {
                this.game.camera.loadTitle();
            }
        }
    };
    drawWin(ctx) {
        this.victory.drawSmallFrame(this.game.clockTick, ctx, 0, 0, PARAMS.SCALE);

        ctx.fillStyle = "WHITE";
        ctx.font = '60px""';
        ctx.fillText("You win", 200, 200);

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px""';
            ctx.fillText("Play Again?", 200, 400);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px""';
            ctx.fillText("Play Again?", 200, 400);
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
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 400) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500) && this.game.click) {
                this.game.camera.loadMap();
            }
        }
    };

    draw(ctx) {
        this.drawTitle(ctx);
    };

    drawTitle(ctx) {
        this.title.drawSmallFrame(this.game.clockTick, ctx, 0, 0, PARAMS.SCALE);

        ctx.fillStyle = "WHITE";
        ctx.font = '60px""';
        ctx.fillText("Pirate Game", 200, 200);

        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 320) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px""';
            ctx.fillText("Start", 200, 400);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px""';
            ctx.fillText("Start", 200, 400);
        }
    };
};