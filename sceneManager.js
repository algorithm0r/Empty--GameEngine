class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;

        this.ship = new Ship(this.game, 500, 295);
    };

    update() {
        let xmid = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let ymid = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKHEIGHT / 2;
        
        this.x = this.ship.x - xmid;
        this.y = this.ship.y - ymid;
    }

    draw(ctx) {

    };
}