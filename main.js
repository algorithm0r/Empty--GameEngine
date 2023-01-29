const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("assets/characters.png");

class MainCharacter extends Animator {
	modeIndex = 0; // current spriteIndex for the sprite frame in the modeSequence
	modeSequences = {
		// mode and the frame sequences necessary
		"WALK": [0, 1, 2, 3],
		"JUMP": [4, 5, 6, 7],
		"HIT": [8, 9, 8],
		"SLASH": [10, 11, 12],
		"PUNCH": [11, 13, 11],
		"RUN": [14, 15, 14, 17]
	};

	constructor({ row = 0, mode = "RUN", fps = 5, scale = 1, location = { x: 0, y: 0 } }) {
		super("assets/characters.png", 5, (32 * row), 32, 32, 4, fps, scale);
		Object.assign(this, { location, mode, row });
		console.log(this, this.location);
	}

	nextSpriteIndex() {
		const seq = this.modeSequences[this.mode];
		this.modeIndex = (this.modeIndex + 1) % seq.length;
		return seq[this.modeIndex];
	}

	update() {
		if (gameEngine.keys["d"]) { // moving right
			this.location.x += 2;
			this.mirrored = false;
		}
		if (gameEngine.keys["a"]) { // moving left
			this.location.x -= 2;
			this.mirrored = true;
		}
		if (gameEngine.keys[" "]) { // initiate jump!
			// TODO: remove/delete jumpStart and initPosition on landing.
			if (this.jumpStart === undefined && this.jumpInitPosition === undefined) {
				this.mode = "JUMP";
				this.modeIndex = 0;
				this.jumpStart = new Date();
				this.jumpInitPosition = this.location;
			}
		}
		if (this.jumpStart !== undefined && this.jumpInitPosition !== undefined) {
			// credit for formulae https://www.youtube.com/watch?v=hG9SzQxaCm8
			// NOTE: video assumes different coordinate system than canvas. 
			const t = (new Date() - this.jumpStart) / 1000; // current air time(seconds)
			const t_h = 0.25;       // time to apex of jump in seconds.
			const h = 6;            // desired height of jump
			const v_0 = -2 * h / t_h;   // initial velocity in the y axis
			const g = 2 * h / (t_h ** 2); // acceleration due to gravity.

			this.location.y = 0.5 * g * t ** 2 + v_0 * t + this.jumpInitPosition.y;
		}
		if (this.location.y > 600) { // bottom of map @ ctx size y=768
			this.jumpInitPosition = this.jumpStart = undefined;
			
			this.location.y = 600;
			this.mode = "RUN";
			this.modeIndex = 0;
		}
		super.update();
	}
}
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.mainCharacter =
		new MainCharacter({
			row: 2,
			mode: "RUN",
			location: { x: 0, y: 500 },
			scale: 2
		});
	gameEngine.addEntity(gameEngine.mainCharacter);
	gameEngine.init(ctx);
	gameEngine.start();
});
