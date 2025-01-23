class Player extends Actor {
    constructor() {
        super();
    }

    update() {
        if (gameEngine.keys['a']) this.x -= 500 * gameEngine.clockTick;
        if (gameEngine.keys['d']) this.x += 500 * gameEngine.clockTick;
        if (gameEngine.keys['w']) this.y -= 500 * gameEngine.clockTick;
        if (gameEngine.keys['s']) this.y += 500 * gameEngine.clockTick;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - 25, this.y - 25, 50, 50);
    }
}