class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;
        this.gold = 0;
        this.time = 0;

        this.gameOver = false;

        this.ship = new Ship(this.game, this.x, this.y);
        this.game.addEntity(this.ship);
        
        //Temp entities
        this.game.addEntity(new EnemyShip(this.game, -200, -250, this.ship));

        this.game.addEntity(new Rock(this.game, 100, 100));
    };

    clearEntities() {
        this.game.entities.forEach(entity => {
            entity.removeFromWorld = true;
        });
    };

    update() {
        if (this.timer === undefined) {
            this.timer = 0;
        } else {
            this.timer += this.game.clockTick;
        }

        if (this.timer > 2) {
            this.time += 1;
            this.timer = undefined;
        }

        PARAMS.DEBUG = document.getElementById("debug").checked;
        let xmid = PARAMS.CANVAS_WIDTH / 2 - PARAMS.TILEWIDTH * 2;
        let ymid = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.TILEHEIGHT * 2;
        
        this.x = this.ship.x - xmid;
        this.y = this.ship.y - ymid;
    };

    draw(ctx) {
        ctx.font = '50px ""';
        ctx.fillStyle = "White";
        ctx.fillText("Gold: " + this.gold, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 6);
        ctx.fillText("Time: " + this.time, PARAMS.TILEWIDTH * 51, PARAMS.TILEHEIGHT * 3)
        ctx.fillText("HP: ", PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 3);
        if(this.ship.health > 0) {
            let ratio = this.ship.health / this.ship.maxHealth;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.3 ? "Red" : ratio < 0.6 ? "Yellow" : "Green";
            ctx.fillRect((this.ship.x - this.game.camera.x) / 5, (this.ship.y - this.game.camera.y) / 12.75, this.ship.width * ratio * 5, PARAMS.TILEHEIGHT);
            ctx.strokeRect((this.ship.x - this.game.camera.x) / 5, (this.ship.y - this.game.camera.y) / 12.75, this.ship.width * 5, PARAMS.TILEHEIGHT);
        }
    };
}