const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();

ASSET_MANAGER.queueDownload("link.png", "overworld_tiles.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new AnimationBuilder(); // <- just to build the sprites & animations into ANIMANAGER


	gameEngine.addEntity(new Player(null, 10, 10)); // you don't need to pass gameEngine it can be accessed from anywhere bc it's a global const 
	gameEngine.addEntity(new Grass(null));

	
	gameEngine.init(ctx);

	gameEngine.start();
});