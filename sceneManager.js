class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.test_sprite = new this.test_sprite(this.game, 0, 0);
        this.game.addEntity(this.test_sprite);

    };

};