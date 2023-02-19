class Healthbar {
    constructor(agent) {
        Object.assign(this, {game, agent});
    };

    update() {

    };

    draw(ctx) {
        if(this.agent.health < this.agent.maxHealth) {
            let ratio = this.agent.health / this.agent.maxHealth;
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ratio < 0.2 && ratio >=0 ? "Red" : ratio < 0.5 && ratio >=0 ? "Yellow" : "Green";
            ctx.fillRect(this.agent.x - this.game.camera.x, this.agent.y - this.game.camera.y - 15, this.agent.width * ratio,  6);
            ctx.strokeRect(this.agent.x - this.game.camera.x, this.agent.y - this.game.camera.y - 15, this.agent.width , 6);
        }
    };
}