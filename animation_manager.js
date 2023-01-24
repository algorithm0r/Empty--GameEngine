// Global Stuff
const DEBUG = 0; // <--is broken, I bet it was you! shame on you 🤨

// main class
class AnimationManager {
    constructor() {
        this.spriteSheets = new Map(); // <string: id, object: Image Obj (from AssetManager)>
        this.spriteSets  =  new Map(); // <string: id, object: SpriteSet>
        this.animations  =  new Map(); // <string: id, object: Animation>
    }
    // you don't need to use the getters, but they are here if you prefer to use them 😀
    getSpriteSheet(id) {return this.spriteSheets.get(id);}
    getSpriteSet(id) {return this.spriteSets.get(id);}
    getAnimation(id) {return this.animations.get(id);}

    /**
     * Adds a SpriteSheet to the collection
     * @param {string} id 
     * @param {string} spriteSheet 
     */
    addSpriteSheet(id, spriteSheet) {
        // TODO: check for stuff
        this.spriteSheets.set(id, spriteSheet);
    }

    /**
     * For when you just want 1 sprite
     * 
     * @param {string} id The unique ID of this Sprite
     * @param {string | object} spriteSheet Unique ID of SpriteSheet or a SpriteSheet Object
     * @param {number} x_orig X-origin of the sprite
     * @param {number} y_orig Y-origin of the sprite
     * @param {number} width width of the sprite
     * @param {number} height height of the sprite
     * @param {number} x_offset Optional : offsets the sprite's x position when drawn
     * @param {number} y_offset Optional : offsets the sprite's y position when drawn
     */
    addSoloSprite(id, spriteSheet, x_orig, y_orig, width, height, x_offset = 0, y_offset = 0) {
        if (typeof spriteSheet === 'string') spriteSheet = this.spriteSheets.get(spriteSheet); // we need the object
        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);
        this.spriteSets.set(id, new SpriteSet(id, spriteSheet, [x_orig], [y_orig], [width], [height], [x_offset], [y_offset]));
    }

    /**
     * Adds a SpriteSet to the collection
     * 
     * @param {string} id The unique ID of this SpriteSet
     * @param {string | object} spriteSheet Unique ID of SpriteSheet or a SpriteSheet Object
     * @param {number[] | number} x_origs List of X-origin's of each sprite or a single shared X-origin
     * @param {number[] | number} x_ends List of X-end cord. of each sprite or a single shared X-end cord
     * @param {number[] | number} y_origs List of Y-origin's of each sprite or a single shared Y-origin
     * @param {number[] | number} y_ends List of Y-end cord. of each sprite or a single shared Y-end cord
     * @param {number[] | number} x_offsets Optional : offsets each sprite's x position when drawn
     * @param {number[] | number} y_offsets Optional : offsets each sprite's y position when drawn
     */
    addSpriteSet(id, spriteSheet, x_origs, x_ends, y_origs, y_ends, x_offsets = 0, y_offsets = 0) {
        // we need to determine the number of sprites in the set 
        if (x_origs instanceof Array) var sprtCount = x_origs.length;
        else if (y_origs instanceof Array) var sprtCount = x_origs.length;
        else if (widths instanceof Array) var sprtCount = widths.length;
        else if (heights instanceof Array) var sprtCount = heights.length;
        else throw new Error('One of {x_origs, y_origs, widths, heights} must be an Array!');

        let widths = [];
        let heights = [];

        // we need the object
        if (typeof spriteSheet === 'string') spriteSheet = this.spriteSheets.get(spriteSheet); 

        if (typeof x_origs === 'number') x_origs = Array(sprtCount).fill(x_origs); // X origins are all the same
        if (typeof y_origs === 'number') y_origs = Array(sprtCount).fill(y_origs); // y origins are all the same

        if (typeof x_ends === 'number') { // widths are all the same
            x_ends = Array(sprtCount).fill(widths);
        }
        if (typeof x_ends === 'object') { // calculate widths
            for (let i = 0; i < sprtCount; i++)
                widths.push(x_ends[i] - x_origs[i]);
        }

        if (typeof y_ends === 'number') { // heights are all the same
            y_ends = Array(sprtCount).fill(y_ends);
        }
        if (typeof y_ends === 'object') { // calculate heights
            for (let i = 0; i < sprtCount; i++)
                heights.push(y_ends[i] - y_origs[i]);
        }

        if (typeof x_offsets === 'number') x_offsets = Array(sprtCount).fill(x_offsets); // x_offsets are all the same
        if (typeof y_offsets === 'number') y_offsets = Array(sprtCount).fill(y_offsets); // y_offsets are all the same 

        if (!(x_origs.length === y_origs.length && y_origs.length === widths.length && 
            widths.length === heights.length && heights.length === x_offsets.length &&
            x_offsets.length === y_offsets.length)) { // they should all be the same length
            
            throw new Error(`The lengths of the addSpriteSetMax() parameter arrays are not
                            all the same, the lengths of each are:\n
                            x-orig = ${x_origs.length}, y-orig = ${y_origs.length},
                            widths = ${widths.length}, heights = ${heights.length},
                            x-offsets = ${x_offsets.length}, y-offsets = ${y_offsets.length})`);
        }

        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);
        this.spriteSets.set(id, new SpriteSet(id, spriteSheet, x_origs, y_origs, widths, heights, x_offsets, y_offsets));
    }

    /**
     * 
     * @param {string | Animation} id The unique ID of this Animation, or a pre-built Animation object
     * @param {string} spriteSetName Unique ID of SpriteSet this Animation uses
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[] | number} fTiming In-order list of frame durations (milliseconds) pass one number for all same timing
     */
    addAnimation(id, spriteSetName, fSequence, fTiming, x_offset = 0, y_offset = 0) {
        if (id instanceof Animation && typeof spriteSetName === 'undefined') {
            if (this.animations.has(id.id)) {
                console.log(`addAnimation: animations.${id.id} has been overridden!`)
            }
            this.animations.set(id.id, id);
            return;
        }

        if (typeof fSequence === 'number') {
            let count = fSequence; fSequence = [];
            for (let i = 0; i < count; i++) fSequence[i] = i;
        }
        if (typeof fTiming === 'number') fTiming = Array(fSequence.length).fill(fTiming);

        if (fSequence.length !== fTiming.length) {
            // Willy-Wonka-Wack-Attack: GOOD DAY SIR!
            throw new Error(`fSequence.length = ${fSequence.length} but fTiming.length = ${fTiming.length}!`);
        }
        if (this.animations.has(id)) {
            console.log(`addAnimation: animations.${id} has been overridden!`);
        }

        

        const setObj = this.spriteSets.get(spriteSetName); // Animation class constructor wants the SpriteSet object
        this.animations.set(id, new Animation(id, setObj, fSequence, fTiming, x_offset, y_offset));

    }
}


class SpriteSet {

    constructor(id, spriteSheet, sx_s, sy_s, sWidth_s, sHeight_s, x_offset_s, y_offset_s) {
        Object.assign(this, {id, spriteSheet, sx_s, sy_s, sWidth_s, sHeight_s, x_offset_s, y_offset_s});
    }

    drawSprite(ctx, sKey, dx, dy, xScale = 1, yScale = xScale) {
        let sx = this.sx_s[sKey];
        let sy = this.sy_s[sKey];
        let sWidth = this.sWidth_s[sKey];
        let sHeight = this.sHeight_s[sKey];
        let dWidth  = sWidth * xScale;
        let dHeight = sHeight * yScale;


        dx += this.x_offset_s[sKey] * xScale;
        dy += this.y_offset_s[sKey] * yScale;

        if (DEBUG >= 2) {
            console.log(`dx:${dx}  dy:${dy}  xs:${xScale}  ys:${yScale}  sx:${sx}  sy:${sy}  sWidth:${sWidth}  
            sHeight:${sHeight}  dWidth:${dWidth}  dHeight:${dHeight}`)
        }

        ctx.drawImage(this.spriteSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        if (DEBUG >= 1) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '9px monospace';
            
            ctx.strokeRect(dx, dy, dWidth, dHeight);
            ctx.fillText('s:'+sKey, dx+2, dy-5); // sprite number
            ctx.fillText('x:'+Math.floor(dx), dx+2, dy-25); // x orig-cord
            ctx.fillText('y:'+Math.floor(dy), dx+2, dy-15); // y orig-cord
            ctx.fillText('w:'+dWidth, dx + (dWidth/2)-12 , dy + dHeight+15); // width of sprite
            ctx.fillText('h:'+dHeight, dx + dWidth+5, dy + (dHeight/2)+5);  // height of sprite
        }
    }

    tileSprite(ctx, spriteIndex, dx, dy, numHorzTiles, numVertTiles, xScale = 1, yScale = xScale) {
        if (spriteIndex instanceof Array) {
            let sWidth = this.sWidth_s[spriteIndex[0]];
            let sHeight =  this.sHeight_s[spriteIndex[0]];
    
            for (let h = 0; h < numHorzTiles; h++) {
                for (let v = 0; v < numVertTiles; v++) {
                    let dx_t = dx + h * sWidth * xScale;
                    let dy_t = dy + v * sHeight * yScale;
                    this.drawSprite(ctx, spriteIndex[v, h], dx_t, dy_t, xScale, yScale);
                }
            }
        } else {
            let sWidth = this.sWidth_s[spriteIndex];
            let sHeight =  this.sHeight_s[spriteIndex];
    
            for (let h = 0; h < numHorzTiles; h++) {
                for (let v = 0; v < numVertTiles; v++) {
                    let dx_t = dx + h * sWidth * xScale;
                    let dy_t = dy + v * sHeight * yScale;
                    this.drawSprite(ctx, spriteIndex, dx_t, dy_t, xScale, yScale);
                    }
                }
        }
    }

    getSpriteCount() {
        return this.count;
    }

    getSpriteDimensions(spriteKey, log = false) {
        if (log)
            console.log(`${this.id}[${spriteKey}] --> width: ${sWidth_s[spriteKey]}, height:${sHeight_s[spriteKey]}`);
        return [sWidth_s[spriteKey], sHeight_s[spriteKey]];
    }
    
};

/**
 * Animation™ makes the animation magic happen 🐭
 */
class Animation {
    /**
     * @param {string} id The unique ID of this Animation
     * @param {SpriteSet} spriteSet see SpriteSet® 
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[]} fTiming In-order list of frame durations (milliseconds)
     */
    constructor(id, spriteSet, fSequence, fTiming, x_offset, y_offset) {
        if (fSequence.length !== fTiming.length)
            throw new Error('Animation: fSequence and fTiming are not same length');
        
        Object.assign(this, {id, spriteSet, fSequence, fTiming, x_offset, y_offset});
        this.fCount = this.fSequence.length;
        this.init();
    }

    init() {
        this.adj_fTiming = [...this.fTiming];
        this.adj_fSequence = [...this.fSequence];
        this.adj_x_offset = this.x_offset;
        this.adj_y_offset = this.y_offset;

        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.fTiming[0];
        this.loop = true;
    }

    getFrameDimensions(log = false) {
        return spriteSet.getSpriteDimensions(currFrame, log);
    }

    reset() {
        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.adj_fTiming[0];
    }

    setLooping(isLooping) {
        this.looping = isLooping;
    }

    setAnimaSpeed(animationSpeed) {
        this.adj_fTiming = [...this.fTiming];
        this.adj_fTiming.map(x => x * 100 / animationSpeed); // linear speed adjustment
    }

    calcFrame() { // TODO Make code clean again 
        if (this.elapsedTime < this.nextFrameAt) {
            return this.adj_fSequence[this.currFrame];
        }
        else if (this.currFrame < this.fCount - 1) {
            this.currFrame++;
            this.nextFrameAt += this.adj_fTiming[this.currFrame];
            return this.fSequence[this.currFrame];
        }
        else { // if currFrame is the last frame
            if (this.loop) {
                this.elapsedTime = 0;
                this.currFrame = 0;
                this.nextFrameAt = this.adj_fTiming[this.currFrame];
                return this.fSequence[this.currFrame];
            }
            else { // no loop == repeat the last frame of animation
                return this.fSequence[this.currFrame];
            }
        }

    }

    
    animate(tick, ctx, dx, dy, xScale = 1, yScale = xScale) {
        let frameNum = this.calcFrame();
        this.spriteSet.drawSprite(ctx, frameNum, dx + this.x_offset, dy + this.y_offset, xScale, yScale)

        if (DEBUG >= 1) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '10px monospace';

            ctx.fillText('f:'+this.fSequence[this.currFrame], dx+25, dy-5); // animation frame number

            let dur = Math.floor(this.adj_fTiming[this.currFrame] * 1000);
            ctx.fillText('ms:'+dur, dx+50, dy-5); // animation frame duration in milliseconds
        }

        this.elapsedTime += tick;

    }
}