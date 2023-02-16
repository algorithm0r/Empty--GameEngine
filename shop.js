class Shop {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.width = 400;
        this.height = 400;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/2 Objects/Houses/shop.png");
        this.shop = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);
        this.shopOpen = false;
        this.upgradeLevels = 4;


        this.shopArea = new BoundingBox(this.x + 150, this.y + 200, this.width / 2, this.height / 2);
        this.BB = new BoundingBox(this.x + 180, this.y + 250, this.width / 3, this.height / 6);
    };

    update() {
        let ship = this.game.player;

        if(this.shopArea.collide(ship.BB)) {
            if(this.game.keys['e'] && !this.shopOpen) {
                this.shopOpen = true;
                this.game.addEntity(new ShopUI(this.game, this));
            } 
        } else {
            this.shopOpen = false;
        }

    };

    draw(ctx) {
        this.shop.drawSmallFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);

        if(PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.shopArea.x - this.game.camera.x, this.shopArea.y - this.game.camera.y, this.shopArea.width, this.shopArea.height);
        }
    }
}

class ShopUI {
    constructor(game, shop) {
        Object.assign(this, {game, shop});
        this.game.shopOpen = true;
    }

    update() {
        //speed
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 245 && this.game.mouse.y <= 285) && this.game.click) {
                this.upgradeSpeed();
            }
        }
        //damage
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 355 && this.game.mouse.y <= 395) && this.game.click) {
                this.upgradeDamage();
            }
        }
        //health
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 465 && this.game.mouse.y <= 505) && this.game.click) {
                console.log("clicked health upgrade");
                this.upgradeHealth();
            }
        }
    };

    upgradeSpeed() {
        if(this.game.player.speedLevel < this.shop.upgradeLevels) {
            this.game.player.speedLevel++;
            this.game.player.speed += this.game.player.speed * .1;
            console.log(this.game.player.speedLevel);
        }
    };

    upgradeDamage() {
        if(this.game.player.damageLevel < this.shop.upgradeLevels) {
            this.game.player.damageLevel++;
            // this.game.
        }
    };

    upgradeHealth() {
        if(this.game.player.healthLevel < this.shop.upgradeLevels) {
            this.game.player.healthLevel++;
            this.game.player.maxHealth += 25;
            console.log(this.game.player.speedLevel);
            console.log("max HP");
            console.log(this.game.player.maxHealth);
        }
    };

    draw(ctx) {
        if(this.shop.shopOpen) {
            //box 1
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 210, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 210, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
            
            //upgrade speed
            ctx.font ="20px '"
            ctx.fillText("Speed: Increase Ship", PARAMS.CANVAS_WIDTH / 2 - 425, 260);
            ctx.fillText("Speed By 10%", PARAMS.CANVAS_WIDTH / 2 - 365, 285);
            ctx.strokeStyle = "white";

            //buy item 1

            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 245 && this.game.mouse.y <= 285)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"
                    ctx.font = "18px '";
                    ctx.fillStyle = "red";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 270);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"
                    ctx.font = "18px '";
                    ctx.fillStyle = "white";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 270);
                }
            }

            //box 2
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 320, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 320, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";

            //upgrade damage
            ctx.font ="20px '"
            ctx.fillText("Damage: Increase Ship", PARAMS.CANVAS_WIDTH / 2 - 425, 370);
            ctx.fillText("Damage By 5", PARAMS.CANVAS_WIDTH / 2 - 345, 395);
            ctx.strokeStyle = "white";

            //buy item 2

            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 355 && this.game.mouse.y <= 395)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px '";
                    ctx.fillStyle = "red";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 380);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px '";
                    ctx.fillStyle = "white";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 380);
                }
            }

            //box 3
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 430, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 430, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";

            //upgrade health
            ctx.font ="20px '"
            ctx.fillText("Health: Increase Ship", PARAMS.CANVAS_WIDTH / 2 - 425, 480);
            ctx.fillText("Health By 25", PARAMS.CANVAS_WIDTH / 2 - 360, 505);
            ctx.strokeStyle = "white";

            //buy item 3
            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 332 && this.game.mouse.x <= 405) && (this.game.mouse.y >= 465 && this.game.mouse.y <= 505)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px '";
                    ctx.fillStyle = "red";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 490);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px '";
                    ctx.fillStyle = "white";
                    ctx.fillText("Upgrade" , PARAMS.CANVAS_WIDTH / 2 - 175, 490);
                }
            }
            
        } else {
            this.game.shopOpen = false;
            this.removeFromWorld = true;
        }
    };
}