const game = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/ship.png");

ASSET_MANAGER.downloadAll(() => {

    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    PARAMS.TILEWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
    PARAMS.TILEHEIGHT = PARAMS.BITWIDTH * PARAMS.SCALE;

    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    game.addEntity(new Ship(game));
    game.addEntity(new SceneManager(game));

    game.init(ctx);

    game.start();
});
