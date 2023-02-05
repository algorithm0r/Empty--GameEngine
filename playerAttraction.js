class Gravitate {
    constructor(entity, game, player) {
        Object.assign(this, {player, game, entity});

    };

    gravitate() {
        let dist = getDistance(this, this.player);
        let difX = (player.x - this.x) / dist;
        let difY = (player.y - this.y) / dist;
        this.velocity.x += difX * this.acceleration / (dist * dist);
        this.velocity.y += difY * this.accerlation / (dist * dist);
    }

    update() {

    };

    draw(ctx) {

    };
}