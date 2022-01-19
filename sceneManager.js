class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.player = new Player(this.game, "default")
        this.game.addEntity(this.player);
        this.x = 0
        this.y = 0;
        this.loadLevelOne();
        // this.player = new this.player(this.game, 0, 0);
        // this.game.addEntity(this.player);
        //this.test_sprite = new this.test_sprite(this.game, 0, 0);
        //this.game.addEntity(this.test_sprite);

    };
    loadLevelOne() {
        levelOne.clouds.forEach(c => {
            this.game.addEntity(new Cloud(this.game, c.x, c.y))
        });
    }
    update() {
        this.x =  this.player.x - this.game.ctx.canvas.width/2; // Keep camera centered on storm at all times
        this.y = this.player.y/10; // Move scene up a little on jumping (optional)
    }
};
