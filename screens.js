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
                ASSET_MANAGER.pauseBackgroundMusic();
                this.game.camera.loadTitle();
               // ASSET_MANAGER.pauseBackgroundMusic();

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
                ASSET_MANAGER.pauseBackgroundMusic();
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

            if(this.game.player.easymode || this.game.mouse && (this.game.mouse.x >= 900 && this.game.mouse.x <= 1030) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800) && this.game.click) {
                this.game.player.winmoney = 10000;
                this.game.player.weaponupgrade = 10;
                this.game.player.healthupgrade = 100;
                this.game.player.moneyupgrade = 150;
                this.game.player.easymode = true;
                this.game.player.mediummode = false;
                this.game.player.hardmode = false;
                this.game.player.unlimitedmode = false;
            }
            if(this.game.mouse && (this.game.mouse.x >= 1050 && this.game.mouse.x <= 1240) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800) && this.game.click) {
                this.game.player.winmoney = 12000;
                this.game.player.weaponupgrade = 15;
                this.game.player.healthupgrade = 125;
                this.game.player.moneyupgrade = 175;
                this.game.player.easymode = false;
                this.game.player.mediummode = true;
                this.game.player.hardmode = false;
                this.game.player.unlimitedmode = false;
            }
            if(this.game.mouse && (this.game.mouse.x >= 1260 && this.game.mouse.x <= 1390) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800) && this.game.click) {
                this.game.player.winmoney = 15000;
                this.game.player.weaponupgrade = 20;
                this.game.player.healthupgrade = 150;
                this.game.player.moneyupgrade = 200;
                this.game.player.easymode = false;
                this.game.player.mediummode = false;
                this.game.player.hardmode = true;
                this.game.player.unlimitedmode = false;
            }
            if(this.game.mouse && (this.game.mouse.x >= 1410 && this.game.mouse.x <= 1670) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800) && this.game.click) {
                this.game.player.winmoney = undefined;
                this.game.player.weaponupgrade = 10;
                this.game.player.healthupgrade = 100;
                this.game.player.moneyupgrade = 150;
                this.game.player.easymode = false;
                this.game.player.mediummode = false;
                this.game.player.hardmode = false;
                this.game.player.unlimitedmode = true;
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

        ctx.fillStyle = "WHITE";
        ctx.font = '60px Pirate';
        ctx.fillText("Choose Difficulty: ", 400, 800);
        ctx.closePath();

        //difficulty stuff
        //easy
        if(this.game.mouse && (this.game.mouse.x >= 900 && this.game.mouse.x <= 1030) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800)) {
            ctx.fillStyle = "lime";
            ctx.font = '60px Pirate';
            ctx.fillText("Easy", 900, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 1020, 740, 130, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        } 
        else if (this.game.player.easymode) {
            ctx.fillStyle = "lime";
            ctx.font = '60px Pirate';
            ctx.fillText("Easy", 900, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 1020, 740, 130, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        }
        else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Easy", 900, 800);
        }
        
        //medium
        if(this.game.mouse && (this.game.mouse.x >= 1050 && this.game.mouse.x <= 1240) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800)) {
            ctx.fillStyle = "yellow";
            ctx.font = '60px Pirate';
            ctx.fillText("Medium", 1050, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 870, 740, 190, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        } 
        else if (this.game.player.mediummode) {
            ctx.fillStyle = "yellow";
            ctx.font = '60px Pirate';
            ctx.fillText("Medium", 1050, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 870, 740, 190, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        }
        else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Medium", 1050, 800);
        }

        //hard
        if(this.game.mouse && (this.game.mouse.x >= 1260 && this.game.mouse.x <= 1390) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800)) {
            ctx.fillStyle = "red";
            ctx.font = '60px Pirate';
            ctx.fillText("Hard", 1260, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 660, 740, 130, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        } 
        else if (this.game.player.hardmode) {
            ctx.fillStyle = "red";
            ctx.font = '60px Pirate';
            ctx.fillText("Hard", 1260, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 660, 740, 130, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        }
        else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Hard", 1260, 800);
        }

        //unlimited
        if(this.game.mouse && (this.game.mouse.x >= 1410 && this.game.mouse.x <= 1670) && (this.game.mouse.y >= 750 && this.game.mouse.y <= 800)) {
            ctx.fillStyle = "blue";
            ctx.font = '60px Pirate';
            ctx.fillText("Unlimited", 1410, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 510, 740, 260, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        } 
        else if (this.game.player.unlimitedmode) {
            ctx.fillStyle = "blue";
            ctx.font = '60px Pirate';
            ctx.fillText("Unlimited", 1410, 800);

            ctx.lineWidth = 5;
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH - 510, 740, 260, 75);
            ctx.closePath();
            ctx.lineWidth = 2;
        }
        else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Unlimited", 1410, 800);
        } 

        //help page for instructions
        if(this.game.mouse && (this.game.mouse.x >= 200 && this.game.mouse.x <= 320) && (this.game.mouse.y >= 850 && this.game.mouse.y <= 900)) {
            ctx.fillStyle = "GRAY";
            ctx.font = '60px Pirate';
            ctx.fillText("Help", 200, 900);
        } else {
            ctx.fillStyle = "WHITE";
            ctx.font = '60px Pirate';
            ctx.fillText("Help", 200, 900);
        }
        ctx.closePath();
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
        ctx.fillText("- Press 1: Cannonball, 2: Fireball, 3: Harpoon", 150, 300);
        ctx.fillText("- Click to shoot Fireball and Harpoons", 150, 400);
        ctx.fillText("- Press E next to Kames House to open the shop", 150, 500);
        ctx.fillText("- Fireballs pierce Slimes and Monsters, burns Enemy Ships", 150, 600);
        ctx.fillText("- Harpoons do heavy damage and pierce Slimes and Monster, break against Enemy Ships", 150, 700);
        ctx.fillText("- Collect dubloons to win", 150, 900);

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