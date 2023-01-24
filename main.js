const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();

ASSET_MANAGER.queueDownload("testmap.png", "link.png", "overworld_tiles.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;


	new AnimationBuilder(); // <- just to build the sprites & animations into ANIMANAGER


	gameEngine.addEntity(new Player(null, 10, 10)); // you don't need to pass gameEngine it can be accessed from anywhere bc it's a global const 
	gameEngine.addEntity(new Grass(null));
	let testMap = new GameMap(10, 10, "testmap.png", {
		'#00ff00':'grass',
		'#000000':'wall',
		'#aaaaaa':'stoneFloor'
	});

	console.log("adding entities from map to game engine...");
	// for (let i = 0; i < testMap.width; i++) {
	// 	for (let j = 0; j < testMap.height; j++) {
	// 		gameEngine.addEntity(testMap.tileMap[j][i][0]);
	// 	}
	// }
	console.log("entities from map added!");


	
	gameEngine.init(ctx);

	gameEngine.start();
});