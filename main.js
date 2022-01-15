const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/washing_machine/opening/washing_machine_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/washing_machine/walking/washing_machine_walking_sprite_sheet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new WashingMachine(gameEngine));
	gameEngine.init(ctx);
	gameEngine.start();

});

