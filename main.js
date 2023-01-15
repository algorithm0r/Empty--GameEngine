const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("assets/characters.png");

class Man extends Animator {
	modeIndex = 0; // current spriteIndex for the sprite frame in the modeSequence
	static modeSequences = {
		// mode and the frame sequences necessary
		"WALK": [0,1,2,3],
		"JUMP": [4,5,6,7],
		"HIT": [8,9, 8],
		"SLASH": [10,11,12],
		"PUNCH": [11, 13, 11],
		"RUN" : [14,15,14,17]
	};
	
	constructor({row=0, mode="RUN", fps=5, scale=1, location={x:0,y:0}}) {
		super("assets/characters.png", 5, (32*row), 32, 32, 4, fps, scale);
		Object.assign(this, {location, mode, row});
	}
	
	nextSpriteIndex() {
		const seq =  Man.modeSequences[this.mode];
		this.modeIndex = (this.modeIndex + 1) % seq.length;
		return seq[this.modeIndex];
	}
}
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const modesList = Object.keys(Man.modeSequences);
	for(let mode of modesList) {
		for(let row=0; row < 3; row++) {
			[
				new Man({
					row: row,
					mode: mode,
					location: {x:i*32*2, y:row*32*2},
					scale: 2
				})
			].forEach(c => gameEngine.addEntity(c));
}}
	gameEngine.init(ctx);
	gameEngine.start();
});
