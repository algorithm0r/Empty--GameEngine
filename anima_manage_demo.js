const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager("./assets/");

ASSET_MANAGER.queueDownload("running.png", "smash2.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    gameEngine.addEntity(new WaluigiDemo(gameEngine)); // animation_manager Demo


    gameEngine.init(ctx);

    gameEngine.start();
});



class WaluigiDemo {
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 50;
        this.xScale = 2;
        this.yScale = 2;

        this.speed = 150;
        this.acceleration = 1;

        this.timeSpeed = 0.18;
        this.timeAccel = 1;
        this.timeArr = [];

        this.animaSpeedPercent = 120; /* <== animation speed as a percentage like 50 % for half speed
                                           I want ot add a in window slider for this, but that is hard */

        for (let i = 0; i < 8; i++) {
            this.timeArr[i] = this.timeSpeed;
            this.timeSpeed *= this.timeAccel;
        }

        this.anima = new AnimationManager();
        this.anima.addSpriteSheet('running', ASSET_MANAGER.getAsset("running.png"));
        this.anima.addSpriteSet('runSet', 'running', 0, 0, 304, 46, [3, 36, 80, 119, 155, 186, 226, 265])
        this.anima.addAnimation('runAni', 'runSet',
                            [   0,    1,   2,    3,   4,    5,    6,    7],
                            [0.18, 0.18, 0.2, 0.22, 0.2, 0.18, 0.18, 0.18].map(x => x * 100 / this.animaSpeedPercent))

        this.anima.addSpriteSheet('smash', ASSET_MANAGER.getAsset("smash2.png"));
        this.anima.addSpriteSet('smashSet', 'smash', 0, 0, 467, 64, [0, 59, 125, 171, 235, 295, 357, 409])

        // better demo of why I made this :
        this.anima.addAnimation('smashAni', 'smashSet',
                    [0, 1, 2, 3, 4, 5, 6, 2, 4, 5, 6, 7],
                    [0.36, 0.10, 0.10, 0.16, 0.09, 0.25, 0.15, 0.35, 0.09, 0.25, 0.10, 0.10].map(x => x * 100 / this.animaSpeedPercent));

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
        //ctx.fillText(this.value, 20, 20);
        this.anima.runAnimation(this.game.clockTick, ctx, 'runAni', this.x, this.y, this.xScale, this.yScale);
                                                                // only need to pass xScale ↓  for scaling x and y the same amount
        this.anima.runAnimation(this.game.clockTick, ctx, 'smashAni', 100, 225, this.xScale  ); 
    };
}