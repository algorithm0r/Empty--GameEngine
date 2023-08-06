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
                this.game.shopOpen = true;
                //ship.fireattack = false;
                //ship.cannonattack = false;
                //ship.harpoonattack = false;
                this.game.addEntity(new ShopUI(this.game, this));
            } 
            
        } else {
            this.shopOpen = false;
            this.game.shopOpen = false;
            
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
        this.damagesprite = ASSET_MANAGER.getAsset("./assets/items/cannonicon.png");
        this.healthsprite = ASSET_MANAGER.getAsset("./assets/items/healthboosticon.png");
        this.fireballsprite = ASSET_MANAGER.getAsset("./assets/projectiles/fireball.png");
        this.harpoonsprite = ASSET_MANAGER.getAsset("./assets/projectiles/spear.png");
        
        this.cannonart = new Animator(this.damagesprite, 0, 0, 460, 500, 1, 1);
        this.healthart = new Animator(this.healthsprite, 0, 0, 600, 350, 1, 1);
        this.fireballart = new Animator(this.fireballsprite, 0, 0, 17, 17, 1, 1);
        this.harpoonart = new Animator(this.harpoonsprite, 0, 0, 40, 34, 1, 1);
        
    }
    

    update() {
        //fireball
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 245 && this.game.mouse.y <= 285) && this.game.click) {
                this.buyfireball();
            }
        }
        //harpoon
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 355 && this.game.mouse.y <= 395) && this.game.click) {
                this.buyharpoon();
            }
        }
        //health
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 465 && this.game.mouse.y <= 505) && this.game.click) {
                this.buyhealth();
                this.game.player.healthLevel--;
            }
        }
        //base damage increase
        if(this.game.mouse != null) {
            if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 575 && this.game.mouse.y <= 615) && this.game.click) {
               
                this.basedamageincrease();
                this.game.player.damageLevel++;
            }
        }
    };

    buyfireball() {
        if(this.game.player.fireballs < 20 && this.game.camera.gold >= this.game.player.weaponupgrade) {
            this.game.player.fireballs++;
            this.game.camera.gold -= this.game.player.weaponupgrade;
        }
    }

    buyharpoon() {
        if(this.game.player.harpoons < 20 && this.game.camera.gold >= this.game.player.weaponupgrade) {
            this.game.player.harpoons++;
            this.game.camera.gold -= this.game.player.weaponupgrade;
        }
    }

    buyhealth() {
        if(this.game.player.health < this.game.player.maxHealth && 
            this.game.camera.gold >= this.game.player.healthupgrade && this.game.player.healthLevel != 0) {
            this.game.player.health += 10;
            this.game.camera.gold -= this.game.player.healthupgrade;
        }
    }

    basedamageincrease() {
        //this.cntr = 0;
        if(this.game.camera.gold >= this.game.player.moneyupgrade && this.game.player.damageLevel <= 10) {
            this.game.player.damage += 3;
            this.game.player.number += .02;
            this.game.camera.gold -= this.game.player.moneyupgrade;
            this.game.player.moneyupgrade *= 2;
            //this.cntr++;
        }
    }

   

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
            
            this.fireballart.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH / 2 - 480, 250, PARAMS.SCALE);

            ctx.font ="20px Pirate"
            ctx.fillText("Buy Fireball:", PARAMS.CANVAS_WIDTH / 2 - 425, 260);
            ctx.fillText("Current inventory: " + this.game.player.fireballs, PARAMS.CANVAS_WIDTH / 2 - 390, 285);
            ctx.strokeStyle = "white";

            //buy item 1

            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 245 && this.game.mouse.y <= 285)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"
                    ctx.font = "18px'";
                    ctx.fillStyle = "red";
                    ctx.fillText(this.game.player.weaponupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 270);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 245, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"
                    ctx.font = "18px'";
                    ctx.fillStyle = "white";
                    ctx.fillText(this.game.player.weaponupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 270);
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

            this.harpoonart.drawFrame(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH / 2 - 500, 340, PARAMS.SCALE);

            ctx.font ="20px Pirate"
            ctx.fillText("Buy Harpoon:", PARAMS.CANVAS_WIDTH / 2 - 425, 370);
            ctx.fillText("Current inventory: " + this.game.player.harpoons, PARAMS.CANVAS_WIDTH / 2 - 390, 395);
            ctx.strokeStyle = "white";

            //buy item 2

            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 355 && this.game.mouse.y <= 395)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "red";
                    ctx.fillText(this.game.player.weaponupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 380);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 355, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "white";
                    ctx.fillText(this.game.player.weaponupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 380);
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

            this.healthart.drawSmallIcon(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH / 2 - 515, 460, PARAMS.SCALE);


            ctx.font ="20px Pirate"
            ctx.fillText("Repair Health by 10 HP:", PARAMS.CANVAS_WIDTH / 2 - 425, 480);
            ctx.fillText("Upgrade remaining: " + this.game.player.healthLevel, PARAMS.CANVAS_WIDTH / 2 - 390, 505);
            ctx.strokeStyle = "white";
            

            //buy item 3
            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 465 && this.game.mouse.y <= 505)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "red";
                    ctx.fillText(this.game.player.healthupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 490);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 465, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "white";
                    ctx.fillText(this.game.player.healthupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 490);
                }
            }

            //box 4
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 540, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 540, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";

            this.cannonart.drawSmallIcon(this.game.clockTick, ctx, PARAMS.CANVAS_WIDTH / 2 - 500, 550, PARAMS.SCALE);

            //upgrade cannon damage
            ctx.font ="20px Pirate"
            ctx.fillText("Cannonball: ", PARAMS.CANVAS_WIDTH / 2 - 425, 590);
            ctx.fillText("Damage up by 3", PARAMS.CANVAS_WIDTH / 2 - 390, 615);
            ctx.fillText("Firerate up by .2", PARAMS.CANVAS_WIDTH / 2 - 390, 640);
            ctx.strokeStyle = "white";

            //buy item 4
            if(this.game.mouse != null) {
                if(this.game.mouse && (this.game.mouse.x >= 780 && this.game.mouse.x <= 856) && (this.game.mouse.y >= 575 && this.game.mouse.y <= 615)) {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 575, 75, 35);
                    ctx.fillStyle = "green";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 575, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "red";
                    ctx.fillText(this.game.player.moneyupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 600);
                } else {
                    ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 575, 75, 35);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 575, 75, 35);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = "white"

                    ctx.font = "18px'";
                    ctx.fillStyle = "white";
                    ctx.fillText(this.game.player.moneyupgrade + "G" , PARAMS.CANVAS_WIDTH / 2 - 175, 600);
                }
            }

            
        } else {
            this.game.shopOpen = false;
            this.removeFromWorld = true;
        }
    };
}