// const gameEngine = new GameEngine();

// const ASSET_MANAGER = new AssetManager();

// ASSET_MANAGER.queueDownload("./CroppedRyu.png");

// ASSET_MANAGER.downloadAll(() => {
// 	const canvas = document.getElementById("gameWorld");
// 	const ctx = canvas.getContext("2d");

// 	gameEngine.addEntity(new Ryu(gameEngine));

// 	gameEngine.init(ctx);

// 	gameEngine.start();
// });

const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.start();
});