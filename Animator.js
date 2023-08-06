class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        let frame = this.currentFrame();
        if(this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * 2, this.height * 2);
    };

    drawSmallFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        let frame = this.currentFrame();
        if(this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width, this.height);
    };

    drawSmallIcon(tick, ctx, x, y) {
        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        let frame = this.currentFrame();
        if(this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width / 6, this.height / 6);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};