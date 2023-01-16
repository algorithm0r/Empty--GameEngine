class Animator {
	 constructor(filename, sx, sy, sWidth, sHeight, sLength=4, fps=5, scale=3) {
		Object.assign(this, {
			filename, sx, sy, sWidth, sHeight, sLength, fps, scale,
			sheet: ASSET_MANAGER.getAsset(filename),
			mark: 0, // time of the last sprite frame
			tick: 0,  // time since first sprite frame
			spriteIndex: 0,
			location: {x: 0, y: 0},
		});
	 };
	 mirrored = false;

	 nextSpriteIndex() { // default implementation to be replaced.
		this.spriteIndex = (this.spriteIndex + 1) % this.sLength;
		return this.spriteIndex;
	 }

	 update() {
		this.tick += gameEngine.clockTick; // append approx timedelta since last update() call
		if((this.tick - this.mark) > 1/this.fps) { // TODO: what even is time?
			this.spriteIndex = this.nextSpriteIndex();
			this.mark = this.tick;
		}
	 };
	 // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 draw(ctx=this.ctx) {
		this.ctx = ctx;
		let targetx = this.sx+(this.sWidth*(this.spriteIndex)); // sprite source location
		ctx.save();
		let destX = this.location.x;
		if(this.mirrored) { // facing left
			ctx.scale(-1, 1);
			destX *= -1;
			destX -= this.sWidth;
		}
		//ctx.drawImage(this.sheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		ctx.drawImage(this.sheet,
			targetx, this.sy, 									// starting x, starting y in sprite sheet
			this.sWidth, this.sHeight, 							// size in sprite sheet
			destX, this.location.y, 					// desired location in canvas
			this.sWidth*this.scale, this.sHeight*this.scale,	// desired size in canvas
		);
		ctx.restore();
	 };
}