class Animator {
	constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
		Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration});

		this.elapsedTime = 0;
		this.totalTime = frameCount * frameDuration;
	};

	drawFrame(tick, ctx, x, y, scale) {
		this.elapsedTime += tick;

		//reloop animation
		if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
		const frame = this.currentFrame();

		//draw the image based on frame tick 
		ctx.drawImage(this.spritesheet,
			this.xStart + this.width*frame, this.yStart,
			this.width, this.height,
			x, y,
			this.width*scale, this.height*scale);
		
		//draw template
		//drawImage(this.spritesheet,
		//		sX, sY,
		//		sW, sH,
		//		dX, dY,
		//		dW, dH);
	};

	currentFrame() {
		return Math.floor(this.elapsedTime / this.frameDuration);
	};

	isDone() {
		return (this.elapsedTIme >= this.totalTime);
	};
}