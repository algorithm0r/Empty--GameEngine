
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
        this.slimetimer = 0;
        this.spawnchance = null;

        this.gameOver = true;

        let path ="./assets/background/2 Objects/Rocks/rocksprite.png";
        this.rock2 = new WorldObject(this.game, path, -200, -200, true, 2);
        this.tile = new WorldObject(this.game,"./assets/background/1 Tiles/Map_tile_01.png",-400,-200,true,2);

        
        // this.game.addEntity(this.ship);
        
        //Temp entities
        this.rock = new Rock(this.game, 100, 100);
        // this.game.addEntity(this.rock);

        this.spawnmob = new SpawnMobs(this.game, this.x, this.y);
        this.world = new WorldStuff(this.game,this.x,this.y);
        
        this.shop = new Shop(this.game, -400, -100);
        this.ship = new Ship(this.game, this.x, this.y);
        this.hud = new Hud(this.game, this.ship, this.x, this.y);

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

        this.gold = 0;
        this.time = 0;

        //Temp entities
        this.rock = new Rock(this.game, 100, 100);
        // this.game.addEntity(this.rock);

        let path ="./assets/background/2 Objects/Rocks/rocksprite.png";
        this.rock2 = new WorldObject(this.game, path, -200, -200, true, 2);
        this.tile = new WorldObject(this.game,"./assets/background/1 Tiles/Map_tile_01.png",-400,-200,true,2);

        this.spawnmob = new SpawnMobs(this.game, this.x, this.y);
        this.shop = new Shop(this.game, -400, -100);
        this.ship = new Ship(this.game, 0, 0);        
        this.hud = new Hud(this.game, this.ship, 0, 0);
    };

    loadMap() {
        this.clearEntities();
        this.game.camera = this;
        this.gameOver = false;

        this.x = 0;
        this.y = 0;

        this.game.stage = "map";

        this.world.drawMap();
        this.game.addEntity(this.rock);
        this.game.addEntity(this.rock2);
        this.game.addEntity(this.tile);
        this.game.addEntity(this.shop);

        this.game.addEntity(this.ship);
        this.game.addEntity(this.hud);

        
        this.update();
    };

    loadGameover() {
        this.game.stage = "gameover";
        this.gameOver = true;
        this.clearEntities();
        this.game.addEntity(new GameOver(this.game));
    };

    loadVictory() {
        this.game.stage = "victory";
        this.clearEntities();
        this.game.addEntity(new Victory(this.game));
    };

    update() {

        if (this.timer === undefined) {
            this.timer = 0;
        } else {
            this.timer += this.game.clockTick;
        }

        if (this.timer > 1) {
            this.time += 1;
            this.timer = undefined;
        }
        if(this.gameOver === false) {
            this.spawnmob.spawnEnemies();
            console.log(this.gameOver);
        } else {
            this.time = 0;
            this.gold = 0;
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