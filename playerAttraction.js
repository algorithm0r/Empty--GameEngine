class Gravitate {
    constructor(player, game, entity) {
        Object.assign(this, {player, game, entity});

    };

    gravitate() {
        let dist = getDistance(this, this.player);
        let difX = (this.player.x - this.x) / dist;
        let difY = (this.player.y - this.y) / dist;
        this.entity.velocity.x -= difX * this.acceleration;
        this.entity.velocity.y -= difY * this.accerlation;
    }

    update() {

    };

    draw(ctx) {

    };
}