class GameOver {
    constructor(game) {
        Object.assign(this, {game});

        this.game = game;
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
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, 1024, 768);

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
    };

    update() {
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 500) && (this.game.mouse.y >= 300 && this.game.mouse.y <= 500) && this.game.click) {
                this.game.camera.loadTitle();
            }
        }
    };
    drawWin(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, 1024, 768);

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
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, 1024, 768);

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