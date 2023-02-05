class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;
        this.gold = 0;

        this.gameOver = false;

        this.ship = new Ship(this.game, this.x, this.y);
        this.game.addEntity(this.ship);
        
        //Temp entities
        this.game.addEntity(new Rock(this.game, 100, 100));
        this.game.addEntity(new EnemyShip(this.game, -200, -250));
        this.game.addEntity(new Slime(this.game));
        this.game.addEntity(new Coin(this.game, -200, 0, this.ship));
    };

    clearEntities() {
        this.game.entities.forEach(entity => {
            entity.removeFromWorld = true;
        });
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let xmid = PARAMS.CANVAS_WIDTH / 2 - 47;
        let ymid = PARAMS.CANVAS_HEIGHT / 2 - 60;
        
        this.x = this.ship.x - xmid;
        this.y = this.ship.y - ymid;
    };

    draw(ctx) {

    };
}