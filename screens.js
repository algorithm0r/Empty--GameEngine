class GameOver {
    constructor(game,x ,y) {
        Object.assign(this, {game, x ,y});

        this.game = game;
    };

    update() {
        
    };

    draw(ctx) {
        ctx.strokeStyle = "BLACK";
        ctx.font = '60px""';
        ctx.fillText("Play Again?", 200, 200);
    }
}