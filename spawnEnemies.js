class SpawnMobs {
    constructor(game, x, y, player) {
        Object.assign(this, {game, x, y, player});
        // this.spawntimer = this.game.camera.spawntimer;
        // this.slimetimer = this.game.camera.slimetimer;
        // this.time = this.game.camera.time;
        // this.spawnchance = this.game.camera.spawnchance;

    };

    update() {

    };

    spawnRocks() {
        this.xrandomMax = this.game.camera.ship.x + 3000;
        this.xrandomMin = this.game.camera.ship.x - 1200;
        this.yrandomMax = this.game.camera.ship.y + 3000;
        this.yrandomMin = this.game.camera.ship.y - 1200;

        for(var i = 0; i <= 50; i++) {
            this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
            this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
            this.game.addEntity(new Rock(this.game, this.spawnx, this.spawny))
        }
    };

    spawnEnemies() {
        this.xrandomMax = this.game.camera.ship.x + 750;
        this.xrandomMin = this.game.camera.ship.x - 750;
        this.yrandomMax = this.game.camera.ship.y + 750;
        this.yrandomMin = this.game.camera.ship.y - 750;

        this.game.camera.spawntimer += this.game.clockTick;
        this.game.camera.slimetimer += this.game.clockTick;
        if(this.game.camera.time) { //keep spawning slimes
            if(this.game.camera.slimetimer >= 1) {
                this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                this.game.addEntity(new Slime(this.game, this.spawnx, this.spawny, this.game.player));
                if(this.game.camera.time > 120) {
                    this.game.addEntity(new Slime(this.game, this.spawnx, this.spawny, this.game.player));
                }
                this.game.camera.slimetimer = 0;
            }
        }
        if(this.game.camera.spawntimer >= 4) {
            if(this.game.camera.time > 30 && this.game.camera.time < 120) {
                this.game.camera.spawnchance = getRandomInt(0,100)
                console.log("Monster1 spawn chance = " + this.game.camera.spawnchance);
                if(this.game.camera.spawnchance >= 25) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                } 
                if(this.game.camera.spawnchance >= 95) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.game.player));
                }
                this.game.camera.spawntimer = 0;
            }
            else if(this.game.camera.time > 120 && this.game.camera.time < 180) {
                this.game.camera.spawnchance = getRandomInt(0,100)
                console.log("Monster1 spawn chance = " + this.game.camera.spawnchance);
                if(this.game.camera.spawnchance >= 20) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                } 
                if(this.game.camera.spawnchance >= 90) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.game.player));
                }
                this.game.camera.spawntimer = 0;
            }
            else if(this.game.camera.time > 180 && this.game.camera.time < 240) {
                this.game.camera.spawnchance = getRandomInt(0,100)
                console.log("Monster1 spawn chance = " + this.spawnchance);
                if(this.game.camera.spawnchance >= 10) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                } 
                if(this.game.camera.spawnchance >= 85) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.game.player));
                }
                this.game.camera.spawntimer = 0;
            }
            else if(this.game.camera.time >= 240) {
                this.game.camera.spawnchance = getRandomInt(0,100)
                console.log("Monster1 spawn chance = " + this.spawnchance);
                if(this.game.camera.spawnchance >= 5) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                    this.game.addEntity(new Monster1(this.game, this.spawnx, this.spawny, this.game.player));
                    //this.game.addEntity(new Slime(this.game, this.spawnx, this.spawny, this.game.player));
                } 
                if(this.game.camera.spawnchance >= 75) {
                    this.spawnx = getRandomInt(this.xrandomMax, this.xrandomMin);
                    this.spawny = getRandomInt(this.yrandomMax, this.yrandomMin);
                    this.game.addEntity(new EnemyShip(this.game, this.spawnx, this.spawny, this.game.player));
                }
                this.game.camera.spawntimer = 0;
            } 
        } 
    };

    draw(ctx) {

    };
}