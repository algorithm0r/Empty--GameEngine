class Waluigi {
    constructor(game) {
        this.game = game;
        
        this.x = 0;
        this.y = 75;
        this.xScale = 2;
        this.yScale = 2;

        this.speed = 150;
        this.acceleration = 1;

        this.timeSpeed = 0.18;
        this.timeAccel = 1;
        this.timeArr = [];

        for(let i = 0; i < 8; i++) {
            this.timeArr[i] = this.timeSpeed;
            this.timeSpeed *= this.timeAccel;
        }

        this.anima = new AnimationManager();
        this.anima.addSpriteSheet('running', ASSET_MANAGER.getAsset("running.png"));
        this.anima.addSpriteSet('testSet', 'running', 0, 0, 304, 46, [3, 36, 80, 119, 155, 186, 226, 265])
        this.anima.addAnimation('testAnim', 'testSet', [0,1,2,3,4,5,6,7,6,5], [0.18,0.18,0.2,0.22,0.2,0.18,0.18,0.18,.2,.2])

    };

    update() {
        this.x += this.speed * this.game.clockTick;
        this.speed *= this.acceleration;
        if (this.x >= 900) {
            this.x = 0;
            this.speed = 150;
        }
    };

    draw(ctx) {
        this.anima.runAnimation(this.game.clockTick, ctx, 'testAnim', this.x, this.y, this.xScale);
    };
}