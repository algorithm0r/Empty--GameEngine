const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();

// ASSET_MANAGER.queueDownload("testmap.png", "testmap_multiroom.png", "linkNWSE.png", "overworld_tiles.png")

ASSET_MANAGER.queueDownload("testmap.png", "testmap_multiroom.png", "linkNWSE.png", "overworld_tiles.png", "heart.png", "bomb.png", "key.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;


	new AnimationBuilder(); // <- just to build the sprites & animations into ANIMANAGER


	gameEngine.addEntity(new Player(canvas.width/2 - 32, canvas.height/2 - 32)); 
	
	let roomWidth = 15;
	let roomHeight = 12;
	let testMap = new GameMap("testmap_multiroom.png", roomWidth, roomHeight, 16*4, 16*4, {
		'#00ff00':'grass',
		'#555555':'stone',
		'#ffff00':'sand'
	});

	let roomIndexX = 0;
	let roomIndexY = 0;
	testMap.loadMapCell(roomIndexX, roomIndexY);
	
	testMap.addMapEntitiesToEngine(gameEngine);

	gameEngine.init(ctx);

	gameEngine.start();
});