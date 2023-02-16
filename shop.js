class Shop {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.width = 400;
        this.height = 400;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/2 Objects/Houses/shop.png");
        this.shop = new Animator(this.spritesheet, 1, 1, this.width, this.height, 1, 1);
        this.shopOpen = false;
        this.itemLevels = 4;

        this.shopArea = new BoundingBox(this.x + 150, this.y + 200, this.width / 2, this.height / 2);
        this.BB = new BoundingBox(this.x + 180, this.y + 250, this.width / 3, this.height / 6);
    };

    update() {
        let ship = this.game.player;

        if(this.shopArea.collide(ship.BB)) {
            if(this.game.keys['e'] && !this.shopOpen) {
                this.shopOpen = true;
                console.log(this.shopOpen);
                this.game.addEntity(new ShopUI(this.game, this));
            } else if(this.game.keys['q'] && this.shopOpen) {
                this.shopOpen = false;
                console.log("Shop is closed");
            }
        } else {
            this.shopOpen = false;
            console.log(this.shopOpen);
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
            ctx.font ="24px '"
            ctx.fillText("Speed: Increase Ship", PARAMS.CANVAS_WIDTH / 2 - 425, 260);
            ctx.fillText("Speed By 10%", PARAMS.CANVAS_WIDTH / 2 - 355, 285);
            ctx.strokeStyle = "white";

            //buy item 1
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 180, 240, 75, 50);
            ctx.fillStyle = "gray";
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 180, 240, 75, 50);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white"



            //box 2
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 320, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 320, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";

            //box 3
            ctx.strokeStyle = "white";
            ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 500, 430, 400, 110);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 500, 430, 400, 110);
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
        } else {
            this.game.shopOpen = false;
            this.removeFromWorld = true;
        }

    };
}