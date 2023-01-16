class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, loop=true, hFlip=false, vFlip=false) {
        
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, loop, hFlip, vFlip});
        
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale) {

        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                console.log("[DEBUG]: FRAME DROP");
                return;
            }
        }

        let frame = this.currentFrame();
        
        const frameOffset = (this.width+1) * frame;

        if (this.hFlip || this.vFlip) {

            let xScale = this.hFlip ? -1 : 1;
            let yScale = this.vFlip ? -1 : 1;
            let xFlip = this.hFlip ? -this.width : 0;
            let yFlip = this.vFlip ? -this.height : 0;

            const canvasFlip = document.createElement("canvas");
            canvasFlip.width = this.width;
            canvasFlip.height = this.height;
            const ctxFlip = canvasFlip.getContext("2d");
            ctxFlip.imageSmoothingEnabled = false;
            
            ctxFlip.scale(xScale, yScale);
            
            ctxFlip.drawImage(this.spritesheet, 
                this.xStart + frameOffset, this.yStart, 
                this.width, this.height, 
                xFlip, yFlip, 
                this.width, this.height);
            
            ctxFlip.scale(xScale, yScale);

            ctx.drawImage(canvasFlip, x, y, this.width * scale, this.height * scale);

        } else {
            ctx.drawImage(this.spritesheet,
                this.xStart + frameOffset, this.yStart,
                this.width, this.height,
                x, y,
                this.width * scale, this.height * scale);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
    
}