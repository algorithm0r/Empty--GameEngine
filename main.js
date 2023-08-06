const game = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/background/pirategametitle.png");
ASSET_MANAGER.queueDownload("./assets/background/piratedeathscreen.png");
ASSET_MANAGER.queueDownload("./assets/background/victoryscreen.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_01.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_02.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_03.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_13.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_14.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_15.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_25.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_37.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Houses/shop.png");
ASSET_MANAGER.queueDownload("./assets/background/1 Tiles/Map_tile_22.png");
ASSET_MANAGER.queueDownload("./assets/player/mobshipw.png");
ASSET_MANAGER.queueDownload("./assets/enemies/slime.png");
ASSET_MANAGER.queueDownload("./assets/items/coin.png");
ASSET_MANAGER.queueDownload("./assets/items/magnet.png");
ASSET_MANAGER.queueDownload("./assets/items/cannon.png");
ASSET_MANAGER.queueDownload("./assets/items/chest.png");
ASSET_MANAGER.queueDownload("./assets/items/goldbag.png");
ASSET_MANAGER.queueDownload("./assets/items/cannonicon.png");
ASSET_MANAGER.queueDownload("./assets/items/healthboosticon.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Rocks/rocksprite.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Rocks/3.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Other/fired.png");
ASSET_MANAGER.queueDownload("./assets/player/ship.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/cannonball.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/fireball.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/harpoon.png");

ASSET_MANAGER.queueDownload("./assets/projectiles/spear N.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear NE.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear NW.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear E.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear W.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear S.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear SE.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear SW.png");
ASSET_MANAGER.queueDownload("./assets/projectiles/spear.png");

ASSET_MANAGER.queueDownload("./assets/projectiles/skull.png");
ASSET_MANAGER.queueDownload("./assets/enemies/monster.png");
ASSET_MANAGER.queueDownload("./assets/enemies/monster1.png");
ASSET_MANAGER.queueDownload("./assets/enemies/monster2.png");
ASSET_MANAGER.queueDownload("./assets/enemies/shipboss.png");
ASSET_MANAGER.queueDownload("./assets/background/2 Objects/Houses/shop.png");

//music
ASSET_MANAGER.queueDownload("./assets/Music/pirates8bit.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/EndScreen.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/StartMenu.wav");
ASSET_MANAGER.queueDownload("./assets/Music/victory.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/overtaken.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/we are.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/we go.mp3");

//Sound effect
ASSET_MANAGER.queueDownload("./assets/Music/Shoot1.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/Shoot2.mp3");
ASSET_MANAGER.queueDownload("./assets/Music/fire-woosh.wav");


ASSET_MANAGER.downloadAll(() => {

    ASSET_MANAGER.autoRepeat("./assets/Music/pirates8bit.mp3");
    ASSET_MANAGER.autoRepeat("./assets/Music/EndScreen.mp3");
    ASSET_MANAGER.autoRepeat("./assets/Music/StartMenu.wav");
    ASSET_MANAGER.autoRepeat("./assets/Music/victory.mp3");


    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    PARAMS.TILEWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
    PARAMS.TILEHEIGHT = PARAMS.BITWIDTH * PARAMS.SCALE;

    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;


    game.init(ctx);
    this.scene = new SceneManager(game);
    game.addEntity(scene);
    this.scene.loadTitle();
    game.start();
});
