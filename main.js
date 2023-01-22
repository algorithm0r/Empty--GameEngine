const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./zeldagb_spritesheet_modified.png");
ASSET_MANAGER.queueDownload("./testmap.png");

let testMap = null;

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	gameEngine.addEntity(new Player(gameEngine, 10, 10));

	testMap = new GameMap(10, 10, "./testmap.png", {
		'#00ff00':'grass',
		'#000000':'wall'
	});

	console.log("adding entities from map in to game engine...");
	for (let i = 0; i < testMap.width; i++) {
		for (let j = 0; j < testMap.height; j++) {
			gameEngine.addEntity(testMap.tileMap[j][i][0]);
		}
	}
	console.log("entities from map added!");

	/*
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			gameEngine.addEntity(new Grass(gameEngine, i * 16 * 4, j * 16 * 4));
		}
	}
	*/

	
	gameEngine.init(ctx);

	gameEngine.start();
});
