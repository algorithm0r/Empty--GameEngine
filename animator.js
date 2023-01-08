class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration })
        
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;

    };  


    drawFrame(tick, ctx, x, y) {

        this.elapsedTime += tick;
        
        const frame = this.currentFrame();
        

        ctx.drawImage(this.spritesheet, 
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width, this.height);


    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
