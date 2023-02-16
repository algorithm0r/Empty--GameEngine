class Hud {
    constructor(game, player) {
        Object.assign(this, {game, player});
    };

    update() {

    };

    draw(ctx) {
        ctx.font = '50px ""';
        ctx.fillStyle = "White";
        ctx.fillText("Gold: " + this.game.camera.gold, PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 6);
        ctx.fillText("Time: " + this.game.camera.time, PARAMS.TILEWIDTH * 51, PARAMS.TILEHEIGHT * 3)
        ctx.fillText("HP: ", PARAMS.TILEWIDTH, PARAMS.TILEHEIGHT * 3);
        if(this.player.health > 0) {
        let ratio = this.player.health / this.player.maxHealth;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.3 ? "Red" : ratio < 0.6 ? "Yellow" : "Green";
            ctx.fillRect((this.player.x - this.game.camera.x) / 5, (this.player.y - this.game.camera.y) / 12.75, this.player.width * ratio * 5, PARAMS.TILEHEIGHT);
            ctx.strokeRect((this.player.x - this.game.camera.x) / 5, (this.player.y - this.game.camera.y) / 12.75, this.player.width * 5, PARAMS.TILEHEIGHT);
        }
    };
};