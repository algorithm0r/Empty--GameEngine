class GameDisplay {
    constructor() {
        
        this.ctx = null;

        this.heartCount = 12;
        this.bombCount = 0;
        this.currentWeapon;
        this.keyCount = 0;

        this.heartX = 570; 
        this.heartY = 45;

        this.heartWidth = 20;
        this.heartHeight = 20;
        this.bombWidth = 90;
        this.bombHeight = 80;
        this.keyWidth = 30;
        this.keyHeight = 50;
    };

    init(ctx) {
        this.ctx = ctx;
    };

    draw(ctx) {
        // this.drawBorder(); // remove this
        // this.drawItemBorder(); // remove this
        this.drawText();
        this.drawBomb(166, 0);
        this.drawHearts(this.heartX, this.heartY);
        this.drawKey(272, 10);
    };


    drawLine(sx, sy, dx, dy, stroke = "Black", width = 2) {
        if (stroke) {
            this.ctx.strokeStyle = stroke;
        }
        if (width) {
            this.ctx.width = width;
        }

        this.ctx.beginPath(); 
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(dx. dy);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    drawBorder = () => {
        this.ctx.strokeStyle = "White";
        this.ctx.rect(10, 10, 1004, 100);
        this.ctx.stroke();
    };

    drawItemBorder = () => {
        this.ctx.strokeStyle = "Black";
        // this.ctx.fillText("Equipped", 45, 60);
        // this.ctx.fillText("Bomb", 187, 45);
        // this.ctx.fillText("Key", 272, 45);
        // bomb placeholder
        // this.ctx.strokeRect(180, 20, 60, 40);
        // key placeholder
        // this.ctx.strokeRect(260, 20, 60, 40);
        // equipped weapon image placeholder
        this.ctx.strokeRect(30, 20, 100, 80);
    };

    drawLifeText = () => {
        this.drawLine(780, 33, 810, 33);
        this.ctx.beginPath();
        this.ctx.fillText("LIFE", 820, 40);
        this.ctx.closePath();
        this.drawLine(870, 33, 900, 33);
    };

    drawText = () => {
        this.ctx.font = "60px brush script mt, Cursive";
        this.ctx.fillText((this.bombCount + "").padStart(2, "0"), 180, 105);
        this.ctx.fillText((this.keyCount + "").padStart(2, "0"), 260, 105);
    };

    addBomb() {
        if (this.bombCount < 99) {
            this.bombCount++;
        }
    };

    reduceBomb() {
        if (this.bombCount > 1) {
            this.bombCount--;
        }
    };

    addKey() {
        if (this.keyCount < 99) { // change to a new key count??
            this.keyCount++;
        }
    };

    reduceKey() {
        if (this.keyCount > 1) {
            this.keyCount--;
        }
    };

    addHeart() {
        if (this.heartCount < 20) {
            this.heartCount++;
        }
    };

    reduceHeart() {
        if (this.heartCount > 2) { // what to do when heart count = 0??
            this.heartCount--;
        }
    };


    drawHeart(x, y) {
        this.ctx.drawImage(ASSET_MANAGER.getAsset("heart.png"), x, y, this.heartWidth, this.heartHeight);
    };

    drawHearts(x, y) {
        for (let i = 0; i < this.heartCount; i++) {
            if (i > 9) {
                this.drawHeart(this.heartX + (i - 10) * 22, this.heartY + 22);
            }
            this.drawHeart(this.heartX + i * 22, this.heartY);
        }
    };

    drawBomb(x, y) {
        this.ctx.drawImage(ASSET_MANAGER.getAsset("bomb.png"), x, y, this.bombWidth, this.bombHeight);
    };

    drawKey(x, y) {
        this.ctx.drawImage(ASSET_MANAGER.getAsset("key.png"), x, y, this.keyWidth, this.keyHeight);
    };


}