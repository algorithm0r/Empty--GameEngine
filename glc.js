class GameLogicController extends Entity {
    constructor() {
        super();
        this.entityOrder = -1;
        this.state = 0;
    }

    update() {
        if (this.state == 0) {
            this.state = 1;
            gameEngine.addEntity(new Player());
        }
    }
}