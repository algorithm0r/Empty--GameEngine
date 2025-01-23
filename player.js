class Player extends Actor {
    constructor() {
        super();
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}