class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;
        this.gold = 0;
        this.time = 0;

        this.spawntimer = 0;

        this.gameOver = false;

        this.ship = new Ship(this.game, this.x, this.y);
        this.game.addEntity(this.ship);
        
        //Temp entities
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

        this.spawntimer += this.game.clockTick;
        if(this.time < 60){ 
            if(this.spawntimer >= 5) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.ship));
                this.spawntimer = 0;
            }
        }   
        else if(this.time > 60 && this.time < 120) {
            if(this.spawntimer >= 4) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.ship));
                this.spawntimer = 0;
            }
        }
        else if(this.time > 120 && this.time < 180) {
            if(this.spawntimer >= 3) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.ship));
                this.spawntimer = 0;
            }
        }
        else if(this.time > 180 && this.time < 240) {
            if(this.spawntimer >= 2) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.ship));
                this.spawntimer = 0;
            }
        }
        else if(this.time > 240) {
            if(this.spawntimer >= 1) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.ship));
                this.spawntimer = 0;
            }
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