class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.stage;

        this.x = 0;
        this.y = 0;
        this.gold = 0;
        this.time = 0;

        this.spawntimer = 0;

        this.gameOver = false;

        this.ship = new Ship(this.game, this.x, this.y);
        // this.game.addEntity(this.ship);
        
        this.hud = new Hud(this.game, this.ship, this.x, this.y);
        //Temp entities
        this.rock = new Rock(this.game, 100, 100);
        // this.game.addEntity(this.rock);
    };

    clearEntities() {
        this.game.entities.forEach(entity => {
            entity.removeFromWorld = true;
        });
    };

    loadTitle() {
        this.game.stage = "title";
        this.clearEntities();
        this.game.addEntity(new Title(this.game));
    };

    loadMap() {
        this.clearEntities();
        this.game.camera = this;

        this.x = 0;
        this.y = 0;

        this.game.stage = "map";
        this.game.addEntity(this.ship);
        this.game.addEntity(this.hud);

        this.game.addEntity(this.rock);
        

        this.update();
    };

    loadGameover() {
        this.game.stage = "gameover";
        this.clearEntities();
        this.game.addEntity(new GameOver(this.game));
    };

    loadVictory() {
        this.game.stage = "victory";
    };

    update() {
        if(this.game.stage === "map") {
            if (this.timer === undefined) {
                this.timer = 0;
            } else {
                this.timer += this.game.clockTick;
            }
    
            if (this.timer > 1) {
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
        }
        
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let xmid = PARAMS.CANVAS_WIDTH / 2 - PARAMS.TILEWIDTH * 2;
        let ymid = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.TILEHEIGHT * 2;
        
        this.x = this.ship.x - xmid;
        this.y = this.ship.y - ymid;
    };

    draw(ctx) {

    };
}