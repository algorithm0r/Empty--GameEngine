const gameEngine = new gameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./deathscythewalk.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Deathscythewalk(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});
