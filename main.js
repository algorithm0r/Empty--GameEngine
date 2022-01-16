//main class for game, will initiate game assets

//init a fresh game engine and asset manager
const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

//although these assets are technically loaded in the entity classes,
// they must also be downloaded by the asset mangager here as well. (afik)
ASSET_MANAGER.queueDownload("./sprites/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/washing_machine/opening/washing_machine_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/washing_machine/walking/washing_machine_walking_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/jump/jump_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/duckandslide/duckandslide.png");

//trigger downloads and add an entity to the canvas
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	// add a player entity with keyword "washing_machine" 
	// to indicate player type
	gameEngine.addEntity(new Player(gameEngine, "washing_machine"));
	gameEngine.init(ctx);
	gameEngine.start();

});

