class SpawnMobs {
    constructor(game, x, y, player) {
        Object.assign(this, {game, x, y, player});

    };

    update() {

    };

    spawnEnemies() {
        this.game.camera.spawntimer += this.game.clockTick;
        this.game.camera.slimetimer += this.game.clockTick;
        console.log(this.game.camera.spawntimer);
        if(this.game.camera.time) { 
            if(this.game.camera.slimetimer >= 2) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new Slime(this.game, this.spawnx, this.spawny, this.game.player));
                this.game.camera.slimetimer = 0;
            }
        }   
        if(this.game.camera.time > 10 && this.game.camera.time < 120) {
            if(this.game.camera.spawntimer >= 4) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                this.game.camera.spawntimer = 0;
            }
        }
        else if(this.game.camera.time > 120 && this.game.camera.time < 180) {
            if(this.game.camera.spawntimer >= 3) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                this.game.camera.spawntimer = 0;
            }
        }
        else if(this.game.camera.time > 180 && this.camera.time < 240) {
            if(this.game.camera.spawntimer >= 2) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                this.game.camera.spawntimer = 0;
            }
        }
        else if(this.game.camera.time > 240) {
            if(this.game.camera.spawntimer >= 1) {
                this.spawnx = getRandomInt(500, -500);
                this.spawny = getRandomInt(500, -500);
                this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                this.game.camera.spawntimer = 0;
            }
        };
    };

    draw(ctx) {

    };
}