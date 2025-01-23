class Entity {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.entityOrder = 0;
    }
    update() {}
    draw(ctx) {}

    colliding(other) {

        /*
        * entities with collision will have a collection of bounding boxes
        * each bounding box has width, height, x_offset, y_offset
        * returns true if any boxes are colliding, false otherwise
        */

        if (!(this.colliders && other.colliders)) return false;

        for (let i = 0; i < this.colliders.length; i++) {
            for (let j = 0; j < other.colliders.length; j++) {
                const box1 = this.colliders[i];
                const box2 = other.colliders[j];
                const b1w = box1.width;
                const b1h = box1.height;
                const b2w = box2.width;
                const b2h = box2.height;
                const b1x = box1.x_offset + this.x;
                const b1y = box1.y_offset + this.y;
                const b2x = box2.x_offset + other.x;
                const b2y = box2.y_offset + other.y;
                const b1left = b1x - b1w/2;
                const b1top = b1y - b1h/2;
                const b1right = b1x + b1w/2;
                const b1bottom = b1y + b1h/2;
                const b2left = b2x - b2w/2;
                const b2top = b2y - b2h/2;
                const b2right = b2x + b2w/2;
                const b2bottom = b2y + b2h/2;
                // just a couple of constants

                if (b1right > b2left && b1left < b2right && b1top < b2bottom && b1bottom > b2top) return true;
            }
        }
        return false;
    }
}

class Actor extends Entity {
    constructor() {
        super();
        this.isActor = true;
        this.recieved_attacks = [];
        this.effects = [];
    }

    queueAttack(data) {
        this.recieved_attacks.push(data);
    }
}

class Map extends Entity {
    constructor() {
        super();
        this.isMap = true;
        this.entities = [];
    }

    load() {}

    close() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].removeFromWorld = true;
        }
    }
}