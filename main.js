const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./zeldagb_spritesheet_modified.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(new Player(gameEngine, 10, 10));

	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			gameEngine.addEntity(new Grass(gameEngine, i * 16 * 4, j * 16 * 4));
		}
	}

	
	gameEngine.init(ctx);

	gameEngine.start();
});