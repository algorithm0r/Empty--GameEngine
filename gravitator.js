class Gravitator {
    // class to handle the effects of gravity on a client entity.


    constructor(client) {
        this.client = client;
        this.v_0 = 0;// initial velocity in the y axis (blocks don't jump)

        // gravity-based constants:
        this.t_h = 0.25;       // time to apex of "jump" in seconds.
        this.h = 4;            // desired height of "jump"    
        this.g = 2 * this.h / (this.t_h ** 2); // acceleration due to gravity.

    }
    jump() {
        this.v_0 = -2 * this.h / this.t_h;
        this.client.fallInitPosition = client.location;
        this.client.fallStartTime = new Date();
    }
    nextPosition() {
        const client = this.client;

        if (client.canfall) client.falling = true; // assume falling until collision
        for (const entity of gameEngine.entities) { // collision checks
            if (entity == client || !entity.BB) continue; // entity does not have collision

            if (entity.BB.collision(client.BB)) { // landed
                client.falling = false;
                client.fallStartTime = null;
                // bounce back from inside other box
                if (client.location.y < entity.BB.location.y)
                    client.location.y = entity.BB.location.y - client.BB.height;
                this.v_0 = 0;
            }
        }
        if (client.falling && client.fallStartTime == null) {
            client.fallStartTime = new Date();
            client.fallInitPosition = client.location;
        }
        if (client.collision && client.canfall && client.falling) { // fall until collision
            const t = (new Date() - client.fallStartTime) / 1000; // current air time(seconds)
            client.location.y = 0.5 * this.g * this.t ** 2 + this.v_0 * this.t + client.fallInitPosition.y;
        }
        if(client.constructor.name == "MainCharacter") console.log(client.location);
    }
}