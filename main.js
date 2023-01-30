const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("assets/characters.png");

const buildBackground = (sx, sy) => {
	// NOTE: canvas is 1024x768 pixes, 16x12 blocks in dimension
	const ctx = gameEngine.ctx;
	//ctx.save();
	//ctx.globalAlpha = 0.1; // 50% opacity to dim out blocks?
	
	for(const col of Array(16).keys()) {
		for(const row of Array(12).keys()) {
			gameEngine.addEntity(new Block(sx, sy, col*Block.blockwidth, row*Block.blockwidth));
		}
	}
	ctx.restore();
}
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.mainCharacter = new MainCharacter({
			row: 2,
			mode: "RUN",
			location: { x: 0, y: 50 },
			scale: 2
		});
	
	gameEngine.init(ctx);
	buildBackground(2*16, 0*16);	// NOTE: canvas is 64x48 blocks in dimension
	gameEngine.example = new Block(0, 0, 0, 64*4, true, true);
	gameEngine.addEntity(gameEngine.example);
	for(const col of Array(16).keys()) { // draw some ground
		const row = 10;
		gameEngine.addEntity(new Block(0, 0, col*Block.blockwidth, (row-3)*Block.blockwidth, true, false));
		gameEngine.addEntity(new Block(8*16, 2*16, col*Block.blockwidth, row*Block.blockwidth, true, false));
	}
	gameEngine.addEntity(gameEngine.mainCharacter);
	
	gameEngine.start();
});
