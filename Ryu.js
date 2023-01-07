class Ryu {
	constructor(game) {
		this.game = game;
		this.animator = new Animation(ASSET_MANAGER.getAsset("./CroppedRyu.png"), 0, 0, 67, 100, 14, 0.2);
	};

	update() {

	};

	draw(ctx) {
		this.animator.drawFrame(this.game.clockTick, ctx, 25, 25);
	};
}
