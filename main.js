﻿const game = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_01.png");
ASSET_MANAGER.queueDownload("./assets/player/mobshipw.png");
ASSET_MANAGER.queueDownload("./assets/enemies/slime.png");
ASSET_MANAGER.queueDownload("./assets/items/coin.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Rocks/rocksprite.png");
ASSET_MANAGER.queueDownload("./assets/player/ship.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/cannonball.png");


ASSET_MANAGER.downloadAll(() => {

    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    PARAMS.TILEWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
    PARAMS.TILEHEIGHT = PARAMS.BITWIDTH * PARAMS.SCALE;

    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    game.addEntity(new SceneManager(game));

    game.init(ctx);

    game.start();
});
